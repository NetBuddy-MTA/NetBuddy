namespace NetBuddy.Server.DTOs.Account;

public sealed class NewAccountDto
{
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Token { get; set; }
}