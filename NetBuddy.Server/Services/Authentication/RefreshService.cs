using System.Security.Cryptography;
using NetBuddy.Server.Interfaces.Authentication;
using NetBuddy.Server.Models.Auth;

namespace NetBuddy.Server.Services.Authentication;

public class RefreshService : IRefreshService
{
    public RefreshToken CreateRefresh()
    {
        return new RefreshToken
        {
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
            Expires = DateTime.UtcNow.AddDays(30),
            Created = DateTime.UtcNow
        };
    }
}