﻿using Marten;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NetBuddy.Server.Models.Executables.Sequence;
using NetBuddy.Server.Models.User;
using Action = NetBuddy.Server.Models.Executables.Action.Action;

namespace NetBuddy.Server.Controllers.Execution;

[Authorize]
[Route("execution")]
[ApiController]
public class ActionsController : ControllerBase
{
    private readonly IDocumentStore _store;
    private readonly UserManager<UserAccount> _userManager;
    
    public ActionsController(IDocumentStore store, UserManager<UserAccount> userManager)
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
    
    [Route("sequences/{sequenceId?}")]
    [HttpGet]
    public async Task<IActionResult> GetSequence(Guid sequenceId)
    {
        await using var session = _store.QuerySession();

        var sequence = await session.LoadAsync<Sequence>(sequenceId);

        // If the sequence doesn't exist, return a 400 Bad Request
        if (sequence == null) return BadRequest();
        
        var user = await _userManager.GetUserAsync(User);
        
        // If the user is the owner of the sequence, return the sequence
        if(user == sequence.Owner) return Ok(sequence);
        
        // If the user is not the owner of the sequence, return a 400 Bad Request
        return BadRequest();
    }
}