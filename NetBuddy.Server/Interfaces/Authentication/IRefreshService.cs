using NetBuddy.Server.Models.Auth;

namespace NetBuddy.Server.Interfaces.Authentication;

public interface IRefreshService
{
    RefreshToken CreateRefresh();
}