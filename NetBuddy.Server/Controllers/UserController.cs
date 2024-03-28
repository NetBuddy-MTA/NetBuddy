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
    public async Task<IActionResult> Create([FromBody] NewUserDto newUserDto)
    {
        // validate the incoming data (should also be done on the client side)
        string message = newUserDto.Validate();
        
        if (!string.IsNullOrWhiteSpace(message))
            return BadRequest(message);

        await using var session = _store.LightweightSession();
        
        // check if the email is already taken by another user
        var existingUser =
            await session.Query<User>().Where(user => user.Email == newUserDto.Email).FirstOrDefaultAsync();

        if (existingUser != null)
            return BadRequest("Email is already taken");
        
        // create and save the new user
        User newUser = new()
        {
            CreatedOn = DateTime.UtcNow,
            Email = newUserDto.Email,
            Username = newUserDto.Username,
            PasswordHash = _passwordService.Hash(newUserDto.Password)
        };
        
        session.Store(newUser);

        await session.SaveChangesAsync();
        
        return Ok();
    }
}