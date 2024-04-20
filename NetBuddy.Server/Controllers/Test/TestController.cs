using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.Controllers.Test;

[Authorize]
[Route("api/test")]
[ApiController]
public class TestController : ControllerBase
{
    private readonly ILogger<TestController> _logger;
    private readonly UserManager<UserAccount> _userManager;

    public TestController(ILogger<TestController> logger, UserManager<UserAccount> userManager)
    {
        _logger = logger;
        _userManager = userManager;
    }

    [HttpGet("userlist")]
    public async Task<IActionResult> GetUserList()
    {
        _logger.Log(LogLevel.Information, "Retrieving user list...");

        List<UserAccount> userAccounts = await _userManager.Users.ToListAsync();

        _logger.Log(LogLevel.Information, "Retrieved user list.");
        
        return Ok(userAccounts);
    }
}