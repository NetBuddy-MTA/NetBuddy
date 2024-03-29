using Marten.Schema;

namespace NetBuddy.Server.Models.User;

public sealed class UserActions
{
    [Identity]
    public string Email { get; set; } = string.Empty;
    
    public List<Guid> ActionGuids { get; set; } = [];
}