using NetBuddy.Server.Models;

namespace NetBuddy.Server.test;

public static class InitialDataSets
{
    public static readonly User[] Users = [
        new User {
            CreatedOn = DateTime.UtcNow, 
            Email = "test1@mailprovider.com", 
            Username = "Omer", 
            PasswordHash = "$2a$10$o8YFrvnAd3yJsZ.LaKC3beMm3jDkNWCEhULP8do9zgqAA.kOIt6Ie" // 123Omer
        },
        new User
        {
            CreatedOn = DateTime.UtcNow,
            Email = "test2@mailprovider.com",
            Username = "Itamar",
            PasswordHash = "$2a$10$pG92BqezBzc43P/YjY2tWu6/0lNr3xpOAkSe.7RNxvY8P/FVpqU.G" // 123Itamar
        },
        new User
        {
            CreatedOn = DateTime.UtcNow,
            Email = "test3@mailprovider.com",
            Username = "Dana",
            PasswordHash = "$2a$10$pA8WSmRvCNy3wW972C4RXe/APySQLyPNvumpTxuUGl/.NxKGOszBO" // 123Dana
        }
    ];
}