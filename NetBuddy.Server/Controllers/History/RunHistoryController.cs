using AutoFixture;
using Marten;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NetBuddy.Server.Controllers.Execution;
using NetBuddy.Server.Models.History;
using NetBuddy.Server.Models.User;
using ActionResult = NetBuddy.Server.Models.History.ActionResult;
using Range = NetBuddy.Server.DTOs.Range.Range;

namespace NetBuddy.Server.Controllers.History;

[Route("History")]
[ApiController]
[Authorize]
public class RunHistoryController : ControllerBase
{
    private readonly ILogger<ExecutionController> _logger;
    private readonly IDocumentStore _store;
    private readonly UserManager<UserAccount> _userManager;

    public RunHistoryController(ILogger<ExecutionController> logger, IDocumentStore store,
        UserManager<UserAccount> userManager)
    {
        _logger = logger;
        _store = store;
        _userManager = userManager;
    }

    [Route("range")]
    [HttpGet]
    public async Task<IActionResult> GetByRange(Range range)
    {
        // validate the model state
        if (!ModelState.IsValid) return BadRequest(ModelState);

        // validate the range
        if (range.From > range.To) return BadRequest("The query range cannot be negative!");

        // get the user
        var user = await _userManager.GetUserAsync(User);
        // null check
        if (user == null) return Unauthorized();

        // get query session
        await using var session = _store.QuerySession();

        // get the requested range
        var sequenceResults = await session.Query<SequenceResult>()
            .OrderByDescending("EndAt")
            .Skip(range.From)
            .Take(range.To - range.From)
            .ToListAsync();

        // todo: remove this clause, this is a placeholder for testing only!
        if (sequenceResults.IsEmpty())
        {
            var fixture = new Fixture();
            var actionResult = fixture.Create<ActionResult>();

            var seqResult = fixture.Build<SequenceResult>()
                .With(x => x.Owner, user)
                .With(x => x.Id, Guid.NewGuid)
                .With(x => x.StartAt, DateTime.Today)
                .With(x => x.EndAt, DateTime.Now)
                .With(x => x.Results, [actionResult])
                .Create();
            _logger.LogInformation(seqResult.ToString());
            sequenceResults = [seqResult];
        }

        return Ok(sequenceResults);
    }

    [HttpPut]
    public async Task<IActionResult> PutResult([FromBody] SequenceResult result)
    {
        // validate the model state
        if (!ModelState.IsValid) return BadRequest(ModelState);

        // get the user
        var user = await _userManager.GetUserAsync(User);
        // null check
        if (user == null) return Unauthorized();

        result.Owner = user;

        // get query session
        await using var session = _store.LightweightSession();

        // insert the new result and update database
        session.Store(result);
        await session.SaveChangesAsync();

        return Ok(result.Id);
    }

    [Route("{guid}")]
    [HttpDelete]
    public async Task<IActionResult> DeleteResult(string guid)
    {
        // validate the model state
        if (!ModelState.IsValid) return BadRequest(ModelState);

        // get the user
        var user = await _userManager.GetUserAsync(User);
        // null check
        if (user == null) return Unauthorized();

        // parse guid
        Guid id;
        try
        {
            id = Guid.Parse(guid);
            _logger.LogInformation("Parsed result id successfully: {id}", id);
        }
        catch (Exception)
        {
            return BadRequest("Invalid result id.");
        }

        // get write session
        await using var session = _store.LightweightSession();

        // get the result specified by the id
        var result = await session.LoadAsync<SequenceResult>(id);
        if (result == default) return NotFound();
        if (result.Owner == null || result.Owner.Email != user.Email) return Unauthorized();

        session.Delete<SequenceResult>(id);
        await session.SaveChangesAsync();

        return Ok();
    }
}