using Marten.Schema;

namespace NetBuddy.Server.Models;

public sealed class User
{
    // Email is the primary key
    [Identity]
    public string Email { get; set; } = string.Empty;
    
    // Username is the display name
    public string Username { get; set; } = string.Empty;
    
    // CreatedAt is the time the user was created
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    
    // PasswordHash is the hashed password for authentication
    public string PasswordHash { get; set; } = string.Empty;
}