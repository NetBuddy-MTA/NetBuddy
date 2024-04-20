using Microsoft.AspNetCore.Identity;
using NetBuddy.Server.Models.Auth;

namespace NetBuddy.Server.Models.User;

public class UserAccount : IdentityUser
{
    public RefreshToken Refresh { get; set; } = RefreshToken.Empty;
}