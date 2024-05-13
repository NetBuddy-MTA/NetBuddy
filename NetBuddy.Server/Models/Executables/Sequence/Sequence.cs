using Marten.Schema;
using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.Models.Executables.Sequence;

public sealed class Sequence
{
    // Id is the primary key
    [Identity]
    public Guid Id { get; set; }
    
    // Name is the display name
    public string Name { get; set; } = string.Empty;
    
    // Description is the description of the sequence
    public string Description { get; set; } = string.Empty;
    
    // Actions is the list of actions that the sequence contains
    public List<ExecutableAction> Actions { get; set; } = [];
    
    // Owner is the user that created the sequence
    public UserAccount? Owner { get; set; }
}