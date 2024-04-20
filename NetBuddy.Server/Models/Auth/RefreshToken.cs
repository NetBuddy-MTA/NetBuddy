using System.ComponentModel.DataAnnotations;

namespace NetBuddy.Server.Models.Auth;

public class RefreshToken
{
    [MaxLength(64)]
    public string Token { get; set; } = string.Empty;

    public DateTime Expires { get; set; } = DateTime.MinValue;

    public DateTime Created { get; set; } = DateTime.MinValue;

    public bool IsValid => Expires > DateTime.UtcNow && Token != string.Empty;

    public static RefreshToken Empty { get; } = new();
}