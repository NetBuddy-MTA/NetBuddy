using System.Net.Mail;

namespace NetBuddy.Server.DTOs;

public sealed class NewUserDto
{
    public string Email { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;

    public string Validate()
    {
        // check that none of the fields are empty
        if (string.IsNullOrWhiteSpace(Email))
            return "Email is required";
        if (string.IsNullOrWhiteSpace(Username))
            return "Username is required";
        if (string.IsNullOrWhiteSpace(Password))
            return "Password is required";

        // check that the email is a valid email address
        return MailAddress.TryCreate(Email, out _) ? string.Empty : "Invalid email address";
    }
}