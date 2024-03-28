using Marten;
using Microsoft.AspNetCore.Mvc;
using NetBuddy.Server.DTOs;
using NetBuddy.Server.Interfaces;
using NetBuddy.Server.Models;

namespace NetBuddy.Server.Controllers;

[Route("api/users")]
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
    
    
    // todo: remove this endpoint, it's for testing only
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        await using var session = _store.LightweightSession();

        var userList = await session.Query<User>().ToListAsync();
        
        return Ok(userList);
    }
    
    // todo: remove this endpoint, it's for testing only
    [HttpGet("{email}")]
    public async Task<IActionResult> GetByEmail([FromRoute] string email)
    {
        await using var session = _store.LightweightSession();

        var user = await session.Query<User>().Where(user => user.Email == email).FirstOrDefaultAsync();
        
        if (user == null)
            return NotFound();
        return Ok(user);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] UserDTO userDto)
    {
        // validate the incoming data (should also be done on the client side)
        string message = userDto.Validate();
        
        if (!string.IsNullOrWhiteSpace(message))
            return BadRequest(message);

        await using var session = _store.LightweightSession();
        
        // check if the email is already taken by another user
        var existingUser =
            await session.Query<User>().Where(user => user.Email == userDto.Email).FirstOrDefaultAsync();

        if (existingUser != null)
            return BadRequest("Email is already taken");
        
        // create and save the new user
        User newUser = new()
        {
            CreatedOn = DateTime.UtcNow,
            Email = userDto.Email,
            Username = userDto.Username,
            PasswordHash = _passwordService.Hash(userDto.Password)
        };
        
        session.Store(newUser);

        await session.SaveChangesAsync();
        
        return Ok();
    }
    
    [HttpDelete]
    public async Task<IActionResult> Delete([FromBody] UserDTO userDto)
    {
        await using var session = _store.LightweightSession();

        var user = await session.Query<User>().Where(user => user.Email == userDto.Email).FirstOrDefaultAsync();
        
        // if the user doesn't exist, return a 400
        if (user == null)
            return BadRequest();
        
        // if the password is incorrect, return a 400 (and not a 404 'not found')
        // this is done to prevent attackers from guessing email addresses
        if (userDto.Username != user.Username ||
            !_passwordService.Verify(userDto.Password, user.PasswordHash)) 
            return BadRequest();

        // delete the user
        session.Delete(user);

        await session.SaveChangesAsync();

        return Ok();
    }
}