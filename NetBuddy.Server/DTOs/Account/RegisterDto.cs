﻿using System.ComponentModel.DataAnnotations;

namespace NetBuddy.Server.DTOs.Account;

public sealed class RegisterDto
{
    [Required]
    public string? UserName { get; set; }
    
    [Required]
    [EmailAddress]
    public string? Email { get; set; }
    
    [Required] 
    public string? Password { get; set; }
}