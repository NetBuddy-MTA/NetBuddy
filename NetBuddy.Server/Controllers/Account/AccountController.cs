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
    private readonly ITokenService _tokenService;
    private readonly SignInManager<UserAccount> _signInManager;
    
    public AccountController(ILogger<AccountController> logger, UserManager<UserAccount> userManager,
        ITokenService tokenService, SignInManager<UserAccount> signInManager)
    {
        _logger = logger;
        _userManager = userManager;
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
                return Ok(
                    new NewAccountDto
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

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto)
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
            return Unauthorized("Invalid username!");
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password!, false);

        if (!result.Succeeded)
        {
            _logger.Log(LogLevel.Information, "User login failed: {errors}", result);
            return Unauthorized("Username or password is incorrect!");
        }
        
        _logger.Log(LogLevel.Information, "User logged in successfully: {username}", user.UserName);
        return Ok(
            new NewAccountDto
            {
                UserName = user.UserName!,
                Email = user.Email!,
                Token = _tokenService.CreateToken(user)
            });
    }
    
    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteAccount([FromBody] LoginDto loginDto)
    {
        _logger.Log(LogLevel.Information, "Deleting user account...");

        if (!ModelState.IsValid)
        {
            _logger.Log(LogLevel.Information, "Model state is invalid: {state}", ModelState);
            return BadRequest(ModelState);
        }
        
        var user = await _userManager.Users.FirstOrDefaultAsync(user => user.UserName == loginDto.UserName);
        
        if (user == default)
        {
            _logger.Log(LogLevel.Information, "User not found: {username}", User.Identity?.Name);
            return Unauthorized("Invalid username!");
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
            _logger.Log(LogLevel.Information, "User deletion failed: {errors}", result);
            return StatusCode(500, result.Errors);
        }
        
        _logger.Log(LogLevel.Information, "User deleted successfully: {username}", user.UserName);
        return Ok("User deleted successfully!");
    }
}