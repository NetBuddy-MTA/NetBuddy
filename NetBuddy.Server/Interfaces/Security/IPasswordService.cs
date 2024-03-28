namespace NetBuddy.Server.Interfaces.Security;

public interface IPasswordService
{
    string Hash(string password);
    bool Verify(string enteredPassword, string hashedPassword);
}