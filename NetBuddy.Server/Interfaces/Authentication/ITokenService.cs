using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.Interfaces.Security;

public interface ITokenService
{
    string CreateToken(UserAccount user);
}