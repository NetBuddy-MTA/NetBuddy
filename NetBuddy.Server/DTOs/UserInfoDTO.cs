using System.Net.Mail;
using NetBuddy.Server.Models;
using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.DTOs;

public sealed class UserInfoDTO
{
    public string Email { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;

    public bool Validate(out string message)
    {
        // check that none of the fields are empty
        if (string.IsNullOrWhiteSpace(Email))
            message = "Email is required";
        else if (string.IsNullOrWhiteSpace(Username))
            message = "Username is required";
        else if (string.IsNullOrWhiteSpace(Password))
            message = "Password is required";
        // check that the email is a valid email address
        else
            message = MailAddress.TryCreate(Email, out _) ? string.Empty : "Invalid email address";
        
        return string.IsNullOrEmpty(message);
    }
}