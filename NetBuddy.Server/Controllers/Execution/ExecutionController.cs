using Marten;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NetBuddy.Server.Models.Executables.Sequence;
using NetBuddy.Server.Models.User;
using Action = NetBuddy.Server.Models.Executables.Action.Action;

namespace NetBuddy.Server.Controllers.Execution;

[Route("execution")]
[ApiController]
public class ExecutionController : ControllerBase
{
    private readonly IDocumentStore _store;
    private readonly UserManager<UserAccount> _userManager;

    public ExecutionController(IDocumentStore store, UserManager<UserAccount> userManager)
    {
        _store = store;
        _userManager = userManager;
    }

    [Route("actions")]
    [HttpGet]
    public async Task<IActionResult> GetActions()
    {
        await using var session = _store.QuerySession();

        var actions = await session.Query<Action>().ToListAsync();

        return Ok(actions);
    }

    [Authorize]
    [Route("sequences")]
    [HttpGet]
    public async Task<IActionResult> GetAllUserSequences()
    {
        await using var session = _store.QuerySession();

        var user = await _userManager.GetUserAsync(User);

        var sequences = await session.Query<Sequence>()
            .Where(x => x.Owner == user)
            .Select(x => new { x.Id, x.Name, x.Description })
            .ToListAsync();

        return Ok(sequences);
    }

    [Authorize]
    [Route("sequences/{sequenceId?}")]
    [HttpGet]
    public async Task<IActionResult> GetSequence(string sequenceId)
    {
        await using var session = _store.QuerySession();

        var sequence = await session.LoadAsync<Sequence>(new Guid(sequenceId));

        // If the sequence doesn't exist, return a 400 Bad Request
        if (sequence == null) return BadRequest();

        var user = await _userManager.GetUserAsync(User);

        // If the user is the owner of the sequence, return the sequence
        if (user == sequence.Owner) return Ok(sequence);

        // If the user is not the owner of the sequence, return a 400 Bad Request
        return BadRequest();
    }

    [Authorize]
    [Route("sequences")]
    [HttpPut]
    public async Task<IActionResult> PutSequence([FromBody] Sequence sequence)
    {
        // validate the model state
        if (!ModelState.IsValid) return BadRequest(ModelState);

        // todo: some checks that confirm the sequence is valid :D

        // if the sequence already has an id that means it was edited:
        // in that case we should check that the user is the owner of the sequence of that id, if not just assign it a new id
        // if the user is the owner we want to delete the old sequence and all its actions and replace it with the new one
        await using var session = _store.LightweightSession();

        var user = await _userManager.GetUserAsync(User);
        // should never happen, but just in case
        if (user == null) return Unauthorized();

        sequence.Owner = user;

        if (sequence.Id.ToString() != string.Empty)
        {
            var oldSequence = await session.LoadAsync<Sequence>(sequence.Id);
            if (oldSequence != null)
            {
                // if the user is not the owner of the sequence, return a 400 Bad Request
                // this should never happen anyway
                if (oldSequence.Owner != user) return BadRequest();
            }
        }

        session.Store(sequence);

        await session.SaveChangesAsync();

        return Ok(sequence.Id);
    }
}