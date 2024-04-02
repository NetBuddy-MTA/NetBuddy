using System.ComponentModel.DataAnnotations;

namespace NetBuddy.Server.DTOs.Account;

public sealed class RegisterDto
{
    [Required]
    [MaxLength(25)]
    public string? UserName { get; set; }
    
    [Required]
    [EmailAddress]
    [MaxLength(50)]
    public string? Email { get; set; }
    
    [Required]
    [MinLength(6)]
    [MaxLength(100)]
    public string? Password { get; set; }
}