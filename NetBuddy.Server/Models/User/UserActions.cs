using Marten.Schema;

namespace NetBuddy.Server.Models.User;

public sealed class UserActions
{
    [Identity]
    public string UserName { get; set; } = string.Empty;
    
    public List<Guid> ActionGuids { get; set; } = [];
}