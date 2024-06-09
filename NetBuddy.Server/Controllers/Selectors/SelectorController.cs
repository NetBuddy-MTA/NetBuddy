using Marten;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NetBuddy.Server.DTOs.Selector;
using NetBuddy.Server.Models.Executables.Selector;
using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.Controllers.Selectors;

[Authorize]
[Route("selectors")]
[ApiController]
public class SelectorController : ControllerBase
{
    private readonly ILogger<SelectorController> _logger;
    private readonly IDocumentStore _store;
    private readonly UserManager<UserAccount> _userManager;

    public SelectorController(ILogger<SelectorController> logger, IDocumentStore store,
        UserManager<UserAccount> userManager)
    {
        _logger = logger;
        _store = store;
        _userManager = userManager;
    }

    [HttpGet]
    [Route("urls")]
    public async Task<IActionResult> GetUrls()
    {
        var user = await _userManager.GetUserAsync(User);

        // should never happen
        if (user == null) return Unauthorized();

        await using var session = _store.QuerySession();

        var urls = session.Query<Selector>()
            .Where(x => x.Owner == null || x.Owner.Id == user.Id)
            .Select(x => x.Url)
            .ToHashSet();

        return Ok(urls);
    }

    [HttpPost]
    public async Task<IActionResult> GetSelectorsForUrl([FromBody] string url)
    {
        var user = await _userManager.GetUserAsync(User);

        // should never happen
        if (user == null) return Unauthorized();

        await using var session = _store.QuerySession();

        var selectors = await session.Query<Selector>()
            .Where(x => (x.Owner == null || x.Owner.Id == user.Id) && x.Url == url)
            .ToListAsync();
        var dtos = selectors.Select(x => x.Dto());

        return Ok(dtos);
    }

    [HttpGet]
    [Route("all")]
    public async Task<IActionResult> GetAllSelectors()
    {
        var user = await _userManager.GetUserAsync(User);

        // should never happen
        if (user == null) return Unauthorized();

        await using var session = _store.QuerySession();

        var selectors = await session.Query<Selector>()
            .Where(x => x.Owner == null || x.Owner.Id == user.Id)
            .ToListAsync();
        var dtos = selectors.Select(x => x.Dto());

        return Ok(dtos);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteSelector([FromBody] string id)
    {
        // validate the model state
        if (!ModelState.IsValid) return BadRequest(ModelState);

        // validate id is guid
        Guid guid;
        try
        {
            guid = Guid.Parse(id);
        }
        catch (Exception)
        {
            return BadRequest("Invalid id!");
        }

        var user = await _userManager.GetUserAsync(User);

        // should never happen
        if (user == null) return Unauthorized();

        await using var session = _store.LightweightSession();

        var selector = await session.LoadAsync<Selector>(guid);

        if (selector == null) return NotFound(guid);
        if (selector.Owner.Email != user.Email) return Unauthorized();
        session.Delete(selector);
        await session.SaveChangesAsync();
        return Ok(guid);
    }

    [HttpPut]
    public async Task<IActionResult> SaveSelector([FromBody] SelectorDto selectorDto)
    {
        // validate the model state
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = await _userManager.GetUserAsync(User);
        // should never happen, but just in case
        if (user == null) return Unauthorized();

        var selector = Selector.FromDto(selectorDto, user);

        await using var session = _store.LightweightSession();

        _logger.LogInformation($"Selector with id {selector.Id.ToString()}");
        if (selector.Id != Guid.Empty)
        {
            var oldSelector = await session.LoadAsync<Selector>(selector.Id);
            if (oldSelector != null && oldSelector.Owner.Email != user.Email) return BadRequest();
        }

        session.Store(selector);

        await session.SaveChangesAsync();

        return Ok(selector.Id);
    }
}