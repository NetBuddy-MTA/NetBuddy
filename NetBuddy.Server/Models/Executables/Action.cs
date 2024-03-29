using Marten.Schema;
using NetBuddy.Server.Models.IO;

namespace NetBuddy.Server.Models.Executables;

public sealed class Action
{
    // Id is the primary key
    [Identity] 
    public Guid Id { get; set; }
    
    // Name is the display name
    public string Name { get; set; } = string.Empty;
    
    // Description is the description of the action
    public string Description { get; set; } = string.Empty;
    
    // Inputs is the list of inputs for the action
    public List<Variable> Inputs { get; set; } = [];
    
    // Outputs is the list of outputs for the action
    public List<Variable> Outputs { get; set; } = [];
    
    // The actual typescript/javascript code to be executed on the client
    public string Code { get; set; } = string.Empty;
    
    // Owner is the email of the user who created the action
    public string Owner { get; set; } = string.Empty;
    
    // CreatedAt is the time the action was created
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // IsPublished is whether the action is published or not (a published action can be used by other users)
    public bool IsPublished { get; set; } = false;
}