using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NetBuddy.Server.DTOs.Account;
using NetBuddy.Server.Interfaces.Authentication;
using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.Controllers.Account;

[Route("api/account")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<UserAccount> _userManager;
    private readonly ITokenService _tokenService;
    
    public AccountController(UserManager<UserAccount> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // define the user variable based on the registerDto
            UserAccount user = new UserAccount
            {
                UserName = registerDto.UserName,
                Email = registerDto.Email
            };
            
            // try to create the user
            var createdUser = await _userManager.CreateAsync(user, registerDto.Password!);
    
            // if the user was not created, return the errors
            if (!createdUser.Succeeded) return StatusCode(500, createdUser.Errors);
            
            // add the user to the User role
            var roleResult = await _userManager.AddToRoleAsync(user, "User");

            // return the result of the role addition
            if (roleResult.Succeeded)
            {
                return Ok(new NewAccountDto
                {
                    UserName = user.UserName!,
                    Email = user.Email!,
                    Token = _tokenService.CreateToken(user)
                });
            }
            return StatusCode(500, roleResult.Errors);
        }
        catch (Exception e)
        {
            return StatusCode(500, e);
        }
    }
}