namespace NetBuddy.Server.Interfaces;

public interface IPasswordService
{
    string Hash(string password);
    bool Verify(string enteredPassword, string hashedPassword);
}