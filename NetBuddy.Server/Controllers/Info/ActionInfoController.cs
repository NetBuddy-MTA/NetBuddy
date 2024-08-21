using Marten;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NetBuddy.Server.Models.User;
using Action = NetBuddy.Server.Models.Executables.Action.Action;

namespace NetBuddy.Server.Controllers.Info;

[Route("info")]
[ApiController]
[Authorize]
public class ActionInfoController : ControllerBase
{
    private readonly ILogger<ActionInfoController> _logger;
    private readonly IDocumentStore _store;
    private readonly UserManager<UserAccount> _userManager;
    
    public ActionInfoController(ILogger<ActionInfoController> logger, IDocumentStore store, UserManager<UserAccount> userManager)
    {
        _logger = logger;
        _store = store;
        _userManager = userManager;
    }
    
    [Route("action")]
    [HttpPost]
    public async Task<IActionResult> GetActionInfo([FromBody] string[] actionStrings)
    {
        // validate the model state
        if (!ModelState.IsValid) return BadRequest(ModelState);
        
        // get the user
        var user = await _userManager.GetUserAsync(User);
        // null check
        if (user == null) return Unauthorized();
        
        // get query session
        await using var session = _store.QuerySession();
        
        // get the requested actions details
        var actions = await session.LoadManyAsync<Action>(actionStrings);
        
        return Ok(actions);
    }
}