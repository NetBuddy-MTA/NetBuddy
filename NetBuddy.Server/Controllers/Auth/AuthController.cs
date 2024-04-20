using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetBuddy.Server.Interfaces.Authentication;
using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.Controllers.Auth;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly Logger<AuthController> _logger;
    private readonly UserManager<UserAccount> _userManager;
    private readonly IRefreshService _refreshService;
    private readonly ITokenService _tokenService;

    public AuthController(Logger<AuthController> logger, UserManager<UserAccount> userManager, 
        IRefreshService refreshService, ITokenService tokenService)
    {
        _logger = logger;
        _userManager = userManager;
        _refreshService = refreshService;
        _tokenService = tokenService;
    }

    [HttpGet("refresh")]
    public async Task<IActionResult> GetRefreshToken()
    {
        if (!ModelState.IsValid)
        {
            _logger.Log(LogLevel.Information, "Invalid model state!");
            return BadRequest(ModelState);
        }
        
        var refreshToken = Request.Cookies["X-Refresh-Token"];
        // ensure that refresh token exists in cookie
        if (refreshToken == null)
        {
            _logger.Log(LogLevel.Information, "No refresh token in cookie!");
            return Unauthorized();
        }

        var username = Request.Cookies["username"];
        // ensure that username exists in cookie
        if (username == null)
        {
            _logger.Log(LogLevel.Information, "No username in cookie!");
            return Unauthorized();
        }
        
        // find the user with the given username
        var user = await _userManager.Users.FirstOrDefaultAsync(user => user.UserName == username);

        // if the user doesn't exist return unauthorized
        if (user == default)
        {
            _logger.Log(LogLevel.Information, "No user has the query username!");
            return Unauthorized();
        }
        
        // check if the user has a valid refresh token
        if (user.Refresh.IsValid && user.Refresh.Token == refreshToken)
        {
            _logger.Log(LogLevel.Information, "User has valid refresh token, refreshing...");
            // store new refresh token in cookie
            var newRefresh = _refreshService.CreateRefresh();
            HttpContext.Response.Cookies.Append("X-Refresh-Token", newRefresh.Token, 
                new CookieOptions
                {
                    Expires = DateTimeOffset.Now.AddDays(30),
                    HttpOnly = true,
                    Secure = true,
                    IsEssential = true,
                    SameSite = SameSiteMode.None
                });
            // update database to reflect changes
            user.Refresh = newRefresh;
            var result = await _userManager.UpdateAsync(user);

            // if failed to update database
            if (!result.Succeeded)
            {
                _logger.Log(LogLevel.Error, "Unable to update user: {username} refresh token!", user.UserName);
                return StatusCode(500);
            }
            
            // else if success
            _logger.Log(LogLevel.Information, "Updated refresh token for user: {username}", user.UserName);
            return Ok();
        }
        
        // if current token is invalid
        return Unauthorized();
    }

    [HttpGet("jwt")]
    public async Task<IActionResult> GetJwtToken()
    {
        if (!ModelState.IsValid)
        {
            _logger.Log(LogLevel.Information, "Invalid model state!");
            return BadRequest(ModelState);
        }
        
        var refreshToken = Request.Cookies["X-Refresh-Token"];
        // ensure that refresh token exists in cookie
        if (refreshToken == null)
        {
            _logger.Log(LogLevel.Information, "No refresh token in cookie!");
            return Unauthorized();
        } 
        
        var username = Request.Cookies["username"];
        // ensure that username exists in cookie
        if (username == null)
        {
            _logger.Log(LogLevel.Information, "No username in cookie!");
            return Unauthorized();
        }
        
        // find the user with the given username
        var user = await _userManager.Users.FirstOrDefaultAsync(user => user.UserName == username);
        
        // if the user doesn't exist return unauthorized
        if (user == default)
        {
            _logger.Log(LogLevel.Information, "No user has the query username!");
            return Unauthorized();
        }
        
        // check if the user has a valid refresh token
        if (user.Refresh.IsValid && user.Refresh.Token == refreshToken)
        {
            _logger.Log(LogLevel.Information, "User has valid refresh token, getting jwt...");
            // store new jwt token in cookie
            var newJwt = _tokenService.CreateToken(user);
            HttpContext.Response.Cookies.Append("X-Access-Token", newJwt, 
                new CookieOptions
                {
                    Expires = DateTimeOffset.Now.AddMinutes(15),
                    HttpOnly = true,
                    Secure = true,
                    IsEssential = true,
                    SameSite = SameSiteMode.None
                });
            
            _logger.Log(LogLevel.Information, "Updated JWT token for user: {username}", user.UserName);
            return Ok();
        }
        
        // if current token is invalid
        return Unauthorized();
    }
}