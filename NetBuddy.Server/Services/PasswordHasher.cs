using static BCrypt.Net.BCrypt;

namespace NetBuddy.Server.Services;

public class PasswordHasher
{
    public static string Hash(string password)
    {
        var salt = GenerateSalt();

        return HashPassword(password, salt);
    }

    public static bool Verify(string enteredPassword, string hashedPassword) =>
        BCrypt.Net.BCrypt.Verify(enteredPassword, hashedPassword);
}