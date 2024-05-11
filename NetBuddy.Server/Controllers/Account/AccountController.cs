using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.Controllers.Account;

[Authorize]
[Route("info")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<UserAccount> _userManager;
    
    public AccountController(UserManager<UserAccount> userManager)
    {
        _userManager = userManager;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetInfo()
    {
        var user = await _userManager.GetUserAsync(User);
        
        return Ok(user);
    }
}