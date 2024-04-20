using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetBuddy.Server.DTOs.Account;
using NetBuddy.Server.Interfaces.Authentication;
using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.Controllers.Account;

[AllowAnonymous]
[Route("api/account")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly ILogger<AccountController> _logger;
    private readonly UserManager<UserAccount> _userManager;
    private readonly IRefreshService _refreshService;
    private readonly ITokenService _tokenService;
    private readonly SignInManager<UserAccount> _signInManager;
    
    public AccountController(ILogger<AccountController> logger, UserManager<UserAccount> userManager,
        IRefreshService refreshService, ITokenService tokenService, SignInManager<UserAccount> signInManager)
    {
        _logger = logger;
        _userManager = userManager;
        _refreshService = refreshService;
        _tokenService = tokenService;
        _signInManager = signInManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        _logger.Log(LogLevel.Information, "Registering new user...");
        try
        {
            if (!ModelState.IsValid)
            {
                _logger.Log(LogLevel.Information, "Model state is invalid: {state}", ModelState);
                return BadRequest(ModelState);
            }

            // define the user variable based on the registerDto
            UserAccount user = new UserAccount
            {
                UserName = registerDto.UserName,
                Email = registerDto.Email
            };
            
            // try to create the user
            var createdUser = await _userManager.CreateAsync(user, registerDto.Password!);
    
            // if the user was not created, return the errors
            if (!createdUser.Succeeded)
            {
                _logger.Log(LogLevel.Information, "User creation failed: {errors}", createdUser.Errors);
                return StatusCode(500, createdUser.Errors);
            }
            
            // add the user to the User role
            var roleResult = await _userManager.AddToRoleAsync(user, "User");

            // return the result of the role addition
            if (roleResult.Succeeded)
            {
                _logger.Log(LogLevel.Information, "User created successfully: {user}", user);
                return Ok();
            }
            _logger.Log(LogLevel.Information, "User creation failed: {errors}", roleResult.Errors);
            return StatusCode(500, roleResult.Errors);
        }
        catch (Exception e)
        {
            _logger.Log(LogLevel.Information, "An error occurred: {error}", e.Message);
            return StatusCode(500, e);
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        _logger.Log(LogLevel.Information, "Logging in user...");
        
        if (!ModelState.IsValid)
        {
            _logger.Log(LogLevel.Information, "Model state is invalid: {state}", ModelState);
            return BadRequest(ModelState);
        }

        var user = await _userManager.Users.FirstOrDefaultAsync(user => user.UserName == loginDto.UserName);
        
        if (user == default)
        {
            _logger.Log(LogLevel.Information, "User not found: {username}", loginDto.UserName);
            return Unauthorized("Username or password is incorrect!");
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password!, false);

        if (!result.Succeeded)
        {
            _logger.Log(LogLevel.Information, "User login failed, incorrect password!");
            return Unauthorized("Username or password is incorrect!");
        }
        
        _logger.Log(LogLevel.Information, "User logged in successfully: {username}", user.UserName);
        
        // put the token and username in a cookie
        var options = new CookieOptions
        {
            Expires = DateTimeOffset.Now.AddDays(30),
            HttpOnly = true,
            Secure = true,
            IsEssential = true,
            SameSite = SameSiteMode.None
        };
        var refreshToken = _refreshService.CreateRefresh();
        HttpContext.Response.Cookies.Append("X-Refresh-Token", refreshToken.Token, options);
        HttpContext.Response.Cookies.Append("username", user.UserName!, options);
        HttpContext.Response.Cookies.Append("X-Access-Token", _tokenService.CreateToken(user), new CookieOptions
        {
            Expires = DateTimeOffset.Now.AddMinutes(15),
            HttpOnly = true,
            Secure = true,
            IsEssential = true,
            SameSite = SameSiteMode.None
        });

        return Ok(
            new UserInfoDto
            {
                UserName = user.UserName!,
                Email = user.Email!,
            });
    }
    
    [Authorize]
    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteAccount([FromBody] LoginDto loginDto)
    {
        _logger.Log(LogLevel.Information, "Deleting user account...");

        if (!ModelState.IsValid)
        {
            _logger.Log(LogLevel.Information, "Model state is invalid: {state}", ModelState);
            return BadRequest(ModelState);
        }
        
        var refreshToken = Request.Cookies["X-Refresh-Token"];
        // ensure that refresh token exists in cookie
        if (refreshToken == null)
        {
            _logger.Log(LogLevel.Information, "No refresh token in cookie!");
            return Unauthorized();
        }
        
        var usernameCookie = Request.Cookies["username"];
        // ensure that refresh token exists in cookie
        if (usernameCookie == null)
        {
            _logger.Log(LogLevel.Information, "No username in cookie!");
            return Unauthorized();
        }

        if (loginDto.UserName != usernameCookie)
        {
            _logger.Log(LogLevel.Information, "Can't delete user that's not the one who's signed in!");
            return Unauthorized();
        }

        var user = await _userManager.Users.FirstOrDefaultAsync(user => user.UserName == loginDto.UserName);

        if (user == default)
        {
            _logger.Log(LogLevel.Information, "User not found: {username}", loginDto.UserName);
            return Unauthorized("Username or password is incorrect!");
        }

        if (!user.Refresh.IsValid || user.Refresh.Token != refreshToken)
        {
            _logger.Log(LogLevel.Information, "Invalid refresh token!");
            return Unauthorized("Invalid refresh token!");
        }

        var passwordCheck = _userManager.CheckPasswordAsync(user, loginDto.Password!);
        
        if (!passwordCheck.Result)
        {
            _logger.Log(LogLevel.Information, "User login failed: {errors}", passwordCheck);
            return Unauthorized("Username or password is incorrect!");
        }
        
        var result = await _userManager.DeleteAsync(user);

        if (!result.Succeeded)
        {
            _logger.Log(LogLevel.Information, "User deletion failed: {errors}", result.Errors);
            return StatusCode(500, result.Errors);
        }
        
        _logger.Log(LogLevel.Information, "User deleted successfully: {username}", user.UserName);
        return Ok("User deleted successfully!");
    }
}