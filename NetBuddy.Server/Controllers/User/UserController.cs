using Marten;
using Microsoft.AspNetCore.Mvc;
using NetBuddy.Server.DTOs;
using NetBuddy.Server.Interfaces.Security;
using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.Controllers.User;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IDocumentStore _store;
    private readonly IPasswordService _passwordService;

    public UserController(IDocumentStore store, IPasswordService passwordService)
    {
        _store = store;
        _passwordService = passwordService;
    }

#if DEBUG
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        await using var session = _store.LightweightSession();

        var userList = await session.Query<UserInfo>().ToListAsync();
        
        return Ok(userList);
    }
    
    [HttpGet("{email}")]
    public async Task<IActionResult> GetByEmail([FromRoute] string email)
    {
        await using var session = _store.LightweightSession();

        var user = await session.Query<UserInfo>().Where(user => user.Email == email).FirstOrDefaultAsync();
        
        if (user == null)
            return NotFound();
        return Ok(user);
    }
#endif

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] UserInfoDTO userInfoDto)
    {
        // validate the incoming data (should also be done on the client side)
        bool valid = userInfoDto.Validate(out string message);
        
        if (!valid)
            return BadRequest(message);

        await using var session = _store.LightweightSession();
        
        // check if the email is already taken by another user
        var existingUser =
            await session.Query<UserInfo>().Where(user => user.Email == userInfoDto.Email).FirstOrDefaultAsync();

        if (existingUser != null)
            return BadRequest("Email is already taken");
        
        // create and save the new user
        session.Store(userInfoDto.ToUser());

        await session.SaveChangesAsync();
        
        return Ok();
    }
    
    [HttpDelete]
    public async Task<IActionResult> Delete([FromBody] UserInfoDTO userInfoDto)
    {
        await using var session = _store.LightweightSession();

        var user = await session.Query<UserInfo>().Where(user => user.Email == userInfoDto.Email).FirstOrDefaultAsync();
        
        // if the user doesn't exist, return a 400
        if (user == null)
            return BadRequest();
        
        // if the password is incorrect, return a 400 (and not a 404 'not found')
        // this is done to prevent attackers from guessing email addresses
        if (userInfoDto.Username != user.Username ||
            !_passwordService.Verify(userInfoDto.Password, user.PasswordHash)) 
            return BadRequest();

        // delete the user
        session.Delete(user);

        await session.SaveChangesAsync();

        return Ok();
    }
    
    [HttpPut]
    public async Task<IActionResult> Update([FromBody] (UserInfoDTO oldUserDto, UserInfoDTO newUserDto) _)
    {
        var (oldUserDto, newUserDto) = _;
        
        // validate the incoming data (should also be done on the client side)
        if (!oldUserDto.Validate(out string message))
            return BadRequest(message);
        
        if (!newUserDto.Validate(out message))
            return BadRequest(message);
        
        await using var session = _store.LightweightSession();

        var user = await session.Query<UserInfo>().Where(user => user.Email == oldUserDto.Email).FirstOrDefaultAsync();
        
        // if the user doesn't exist, return a 400
        if (user == null)
            return BadRequest();
        
        // if the password is incorrect, return a 400 (and not a 404 'not found')
        // this is done to prevent attackers from guessing email addresses
        if (oldUserDto.Username != user.Username ||
            !_passwordService.Verify(oldUserDto.Password, user.PasswordHash)) 
            return BadRequest();

        // update the user
        user.Username = newUserDto.Username;
        user.PasswordHash = _passwordService.Hash(newUserDto.Password);

        session.Update(user);

        await session.SaveChangesAsync();

        return Ok();
    }
}