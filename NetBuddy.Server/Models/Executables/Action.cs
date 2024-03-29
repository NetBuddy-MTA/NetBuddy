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
}