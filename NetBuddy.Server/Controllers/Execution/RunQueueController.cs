using Marten;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NetBuddy.Server.Models.Executables;
using NetBuddy.Server.Models.Run.RunQueue;
using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.Controllers.Execution;

[ApiController]
[Route("execution/queue")]
[Authorize]
public class RunQueueController : ControllerBase
{
    private readonly ILogger<RunQueueController> _logger;
    private readonly IDocumentStore _store;
    private readonly UserManager<UserAccount> _userManager;

    public RunQueueController(IDocumentStore store, UserManager<UserAccount> userManager,
        ILogger<RunQueueController> logger)
    {
        _store = store;
        _userManager = userManager;
        _logger = logger;
    }

    [HttpGet]
    [Route("first")]
    public async Task<IActionResult> GetFirst()
    {
        var user = await _userManager.GetUserAsync(User);
        // should never happen, but just in case
        if (user == null) return Unauthorized();

        await using var session = _store.LightweightSession();

        // try and find the user's queue
        var queue = await session.LoadAsync<RunQueue>(user.Id);

        // if queue doesn't exist initial one and store it
        if (queue != null)
        {
            _logger.LogCritical("All pipelines in queue:");
            foreach (var guid in queue.ToRun) _logger.LogCritical($"Guid: {guid}");
            var pipelines = await session.LoadManyAsync<Pipeline>(queue.ToRun);
            var match = pipelines.FirstOrDefault(pipeline =>
                pipeline.Owner!.Id == user.Id && pipeline is { IsFinished: false, IsRunning: false });
            if (match == default) return NotFound();
            return Ok(new { match.Id, match.Sequence, match.IsRunning, match.IsFinished, match.Context });
        }

        queue = new RunQueue { UserId = user.Id };
        session.Store(queue);
        await session.SaveChangesAsync();

        return NotFound();
    }

    [HttpGet]
    [Route("all")]
    public async Task<IActionResult> GetAll()
    {
        // get all pipelines in the queue

        var user = await _userManager.GetUserAsync(User);
        // should never happen, but just in case
        if (user == null) return Unauthorized();

        await using var session = _store.QuerySession();

        // try and find the user's queue
        var queue = await session.LoadAsync<RunQueue>(user.Id);

        // if queue doesn't exist initial one and store it
        if (queue != null) return Ok(await session.LoadManyAsync<Pipeline>(queue.ToRun));

        await using var write = _store.LightweightSession();

        queue = new RunQueue { UserId = user.Id };
        write.Store(queue);
        await write.SaveChangesAsync();

        return Ok(queue.ToRun);
    }

    [HttpGet]
    [Route("confirmation/{confirmationId}")]
    public async Task<IActionResult> GetConfirmation([FromRoute] string confirmationId)
    {
        // get confirmation before running the pipeline in case 2 clients got the same sequence at the same time

        var user = await _userManager.GetUserAsync(User);
        // should never happen, but just in case
        if (user == null) return Unauthorized();

        await using var session = _store.QuerySession();

        // try and find the user's queue
        var queue = await session.LoadAsync<RunQueue>(user.Id);

        // if queue doesn't exist initial one and store it
        if (queue != null)
        {
            if (queue.ToRun.IsEmpty()) return NotFound();
            var pipelines = await session.LoadManyAsync<Pipeline>(queue.ToRun);

            var match = pipelines.FirstOrDefault(pipeline =>
                pipeline.Id == Guid.Parse(confirmationId) && !pipeline.IsRunning);
            if (match == default)
                return NotFound();
            match.IsRunning = true;

            await using var update = _store.LightweightSession();
            update.Store(match);

            queue.ToRun.Remove(match.Id);
            update.Store(queue);
            await update.SaveChangesAsync();

            return Ok(match.Id);
        }

        await using var write = _store.LightweightSession();

        queue = new RunQueue { UserId = user.Id };
        write.Store(queue);
        await write.SaveChangesAsync();

        return NotFound();
    }

    [HttpPut]
    public async Task<IActionResult> PutPipeline([FromBody] Pipeline pipeline)
    {
        // add a pipeline to the queue
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = await _userManager.GetUserAsync(User);
        // should never happen, but just in case
        if (user == null) return Unauthorized();

        await using var session = _store.LightweightSession();

        // save the pipeline to the database
        pipeline.Owner = user;
        session.Store(pipeline);
        await session.SaveChangesAsync();

        // try and find the user's queue
        var queue = await session.LoadAsync<RunQueue>(user.Id) ?? new RunQueue { UserId = user.Id };

        queue.ToRun.Add(pipeline.Id);

        session.Store(queue);
        await session.SaveChangesAsync();

        return Ok(pipeline.Id);
    }
}