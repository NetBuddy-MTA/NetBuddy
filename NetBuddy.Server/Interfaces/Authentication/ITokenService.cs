using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.Interfaces.Authentication;

public interface ITokenService
{
    string CreateToken(UserAccount user);
}