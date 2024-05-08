using Marten;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Action = NetBuddy.Server.Models.Executables.Action.Action;

namespace NetBuddy.Server.Controllers.Execution.Actions;

[Authorize]
[Route("api/execution/actions")]
[ApiController]
public class ActionsController : ControllerBase
{
    private readonly IDocumentStore _actionStore;
    
    public ActionsController(IDocumentStore actionStore)
    {
        _actionStore = actionStore;
    }

    [HttpGet]
    public async Task<IActionResult> GetActions()
    {
        await using var session = _actionStore.QuerySession();

        var actions = await session.Query<Action>().ToListAsync();

        return Ok(actions);
    }
}