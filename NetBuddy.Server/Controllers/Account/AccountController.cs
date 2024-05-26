using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.Controllers.Account;

[Authorize]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly SignInManager<UserAccount> _signInManager;
    private readonly UserManager<UserAccount> _userManager;

    public AccountController(UserManager<UserAccount> userManager, SignInManager<UserAccount> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [Route("info")]
    [HttpGet]
    public async Task<IActionResult> GetInfo()
    {
        var user = await _userManager.GetUserAsync(User);

        return Ok(user);
    }

    [Route("logout")]
    [HttpPut]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();

        return Ok();
    }
}