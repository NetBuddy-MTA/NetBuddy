using JasperFx.Core;
using Marten;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NetBuddy.Server.Models.Executables.Sequence;
using NetBuddy.Server.Models.Preset;
using NetBuddy.Server.Models.User;
using Action = NetBuddy.Server.Models.Executables.Action.Action;

namespace NetBuddy.Server.Controllers.Execution;

[Route("execution")]
[ApiController]
public class ExecutionController : ControllerBase
{
    private readonly ILogger<ExecutionController> _logger;
    private readonly IDocumentStore _store;
    private readonly UserManager<UserAccount> _userManager;

    public ExecutionController(IDocumentStore store, UserManager<UserAccount> userManager,
        ILogger<ExecutionController> logger)
    {
        _store = store;
        _userManager = userManager;
        _logger = logger;
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
            .Where(x => x.Owner == null || x.Owner.Id == user!.Id)
            .Select(x => new { x.Id, x.Name, x.Description })
            .ToListAsync();

        return Ok(sequences);
    }

    [Authorize]
    [Route("sequences/{sequenceId?}")]
    [HttpGet]
    public async Task<IActionResult> GetSequence([FromRoute] string sequenceId)
    {
        Guid id;
        try
        {
            id = Guid.Parse(sequenceId);
            _logger.LogInformation("Parsed sequence id successfully: {id}", id);
        }
        catch (Exception)
        {
            return BadRequest("Invalid sequence id.");
        }

        await using var session = _store.QuerySession();

        var sequence = await session.LoadAsync<Sequence>(id);

        // If the sequence doesn't exist, return a 400 Bad Request
        if (sequence == default) return BadRequest("Sequence not found.");

        var user = await _userManager.GetUserAsync(User);

        // If the user is the owner of the sequence, return the sequence
        if (sequence.Owner == null || user!.Id == sequence.Owner.Id) return Ok(sequence);

        // If the user is not the owner of the sequence, return a 400 Bad Request
        return BadRequest("You are not the owner of this sequence.");
    }

    [Authorize]
    [Route("sequences")]
    [HttpPut]
    public async Task<IActionResult> PutSequence([FromBody] Sequence sequence)
    {
        // validate the model state
        if (!ModelState.IsValid) return BadRequest(ModelState);

        List<string> errors = [];
        // todo: some checks that confirm the sequence is valid :D

        // if the sequence already has an id that means it was edited:
        // in that case we should check that the user is the owner of the sequence of that id, if not just assign it a new id
        // if the user is the owner we want to delete the old sequence and all its actions and replace it with the new one
        await using var session = _store.LightweightSession();

        var user = await _userManager.GetUserAsync(User);
        // should never happen, but just in case
        if (user == null) return Unauthorized();

        sequence.Owner = user;

        if (sequence.Id != Guid.Empty)
        {
            var oldSequence = await session.LoadAsync<Sequence>(sequence.Id);
            if (oldSequence?.Owner != null && oldSequence.Owner.Email != user.Email)
                return BadRequest();
        }

        session.Store(sequence);

        await session.SaveChangesAsync();

        return Ok(new
        {
            sequence.Id,
            errors
        });
    }

    [Authorize]
    [Route("sequence/{sequenceId}")]
    [HttpDelete]
    public async Task<IActionResult> DeleteSequence([FromRoute] string sequenceId)
    {
        // validate the model state
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        Guid id;
        try
        {
            id = Guid.Parse(sequenceId);
            _logger.LogInformation("Parsed sequence id successfully: {id}", id);
        }
        catch (Exception)
        {
            return BadRequest("Invalid sequence id.");
        }

        // check if sequence exists and if the user is its owner
        await using var querySession = _store.QuerySession();
        var sequence = await querySession.LoadAsync<Sequence>(id);
        if (sequence != null)
        {
            if (sequence.Owner == null || sequence.Owner.Email != user.Email)
                // user is not the owner of the sequence
                return NotFound();

            // user is the owner and sequence found
            await using var writeSession = _store.LightweightSession();
            writeSession.Delete(sequence);
            writeSession.SaveChangesAsync();
            return Ok();
        }

        return NotFound();
    }

    [Authorize]
    [Route("presets/{sequenceId}")]
    [HttpGet]
    public async Task<IActionResult> GetPresets([FromRoute] string sequenceId)
    {
        // validate the model state
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        Guid id;
        try
        {
            id = Guid.Parse(sequenceId);
            _logger.LogInformation("Parsed sequence id successfully: {id}", id);
        }
        catch (Exception)
        {
            return BadRequest("Invalid sequence id.");
        }

        await using var session = _store.QuerySession();
        var presets = await session.Query<Preset>()
            .Where(x => x.Owner == null || x.Owner.Email == user.Email)
            .Where(x => x.SequenceId == id)
            .ToListAsync();

        return Ok(presets.Map(x => x.ToDisplayPreset()));
    }

    [Authorize]
    [Route("presets/get/{presetId}")]
    [HttpGet]
    public async Task<IActionResult> GetPreset([FromRoute] string presetId)
    {
        // validate the model state
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        Guid id;
        try
        {
            id = Guid.Parse(presetId);
            _logger.LogInformation("Parsed preset id successfully: {id}", id);
        }
        catch (Exception)
        {
            return BadRequest("Invalid preset id.");
        }

        await using var session = _store.QuerySession();
        var preset = await session.LoadAsync<Preset>(id);
        if (preset == null) return BadRequest();

        return Ok(preset);
    }

    [Authorize]
    [Route("presets/save")]
    [HttpPut]
    public async Task<IActionResult> PutPreset([FromBody] Preset preset)
    {
        // validate the model state
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        // if existing preset check if it belongs to the user, if so update it, else unauthorized
        if (preset.Id != Guid.Empty)
        {
            await using var querySession = _store.QuerySession();
            var existingPreset = await querySession.LoadAsync<Preset>(preset.Id);
            if (existingPreset != null && (existingPreset.Owner == null || existingPreset.Owner.Email != user.Email))
                // bad owner
                return Unauthorized();
        }

        preset.Owner = user;
        await using var writeSession = _store.LightweightSession();
        writeSession.Store(preset);
        await writeSession.SaveChangesAsync();

        return Ok(preset.Id);
    }

    [Authorize]
    [Route("presets/delete/{presetId}")]
    [HttpDelete]
    public async Task<IActionResult> DeletePreset([FromRoute] string presetId)
    {
        // validate the model state
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        Guid id;
        try
        {
            id = Guid.Parse(presetId);
            _logger.LogInformation("Parsed sequence id successfully: {id}", id);
        }
        catch (Exception)
        {
            return BadRequest("Invalid sequence id.");
        }

        await using var querySession = _store.QuerySession();
        var preset = await querySession.LoadAsync<Preset>(id);
        if (preset != null && preset.Owner?.Email == user.Email)
        {
            await using var writeSession = _store.LightweightSession();
            writeSession.Delete<Preset>(id);
            await writeSession.SaveChangesAsync();
            return Ok(id);
        }

        return BadRequest();
    }
}