using Marten;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NetBuddy.Server.Models.Extension;
using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.Controllers.Extension;

[Route("extension")]
[ApiController]
[Authorize]
public class ExtensionController : ControllerBase
{
    private readonly ILogger<ExtensionController> _logger;
    private readonly IDocumentStore _store;
    private readonly UserManager<UserAccount> _userManager;


    public ExtensionController(ILogger<ExtensionController> logger, IDocumentStore store,
        UserManager<UserAccount> userManager)
    {
        _logger = logger;
        _store = store;
        _userManager = userManager;
    }

    [Route("register/{extensionId}")]
    [HttpPut]
    public async Task<IActionResult> Register(string extensionId)
    {
        // validate the model state
        if (!ModelState.IsValid) return BadRequest(ModelState);

        // get the user
        var user = await _userManager.GetUserAsync(User);
        // null check
        if (user == null) return Unauthorized();

        await using var session = _store.LightweightSession();

        session.Store(new UserChromeExtension(user.Email, extensionId));
        await session.SaveChangesAsync();

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetId()
    {
        // get the user
        var user = await _userManager.GetUserAsync(User);
        // null check
        if (user == null) return Unauthorized();

        await using var query = _store.QuerySession();

        var extension = await query.LoadAsync<UserChromeExtension>(user.Email);
        if (extension != null) return Ok(new { extension.ExtensionId });
        return NotFound();
    }
}