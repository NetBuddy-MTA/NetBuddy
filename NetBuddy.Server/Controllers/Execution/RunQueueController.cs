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
        if (queue != null) return Ok(queue.ToRun);

        await using var write = _store.LightweightSession();

        queue = new RunQueue { UserId = user.Id };
        write.Store(queue);
        await write.SaveChangesAsync();

        return Ok(queue.ToRun);
    }

    [HttpGet]
    [Route("{confirmationId}")]
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
            if (queue.ToRun.IsEmpty())
                return NotFound();
            var match = queue.ToRun.FirstOrDefault(x => x.Id.ToString() == confirmationId && !x.IsRunning);
            if (match == null)
                return NotFound();
            match.IsRunning = true;

            await using var update = _store.LightweightSession();
            update.Store(queue);
            await update.SaveChangesAsync();

            return Ok(match);
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

        var user = await _userManager.GetUserAsync(User);
        // should never happen, but just in case
        if (user == null) return Unauthorized();

        await using var session = _store.LightweightSession();

        // try and find the user's queue
        var queue = await session.LoadAsync<RunQueue>(user.Id) ?? new RunQueue { UserId = user.Id };

        queue.ToRun.Enqueue(pipeline);

        session.Store(queue);
        await session.SaveChangesAsync();

        return Ok(pipeline.Id);
    }
}