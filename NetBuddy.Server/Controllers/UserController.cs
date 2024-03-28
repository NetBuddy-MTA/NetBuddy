using Marten;
using Microsoft.AspNetCore.Mvc;
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
}