using Marten.Schema;

namespace NetBuddy.Server.Models.Executables.Action;

public sealed class Action
{
    // DisplayName is the display name for the action
    [Identity]
    public string DisplayName { get; set; } = string.Empty;

    // ActionString is the internal identifier for the extension
    public string ActionString { get; set; } = string.Empty;
    
    // Description is the description of the action
    public string Description { get; set; } = string.Empty;
    
    // Category for the action
    public string Category { get; set; } = string.Empty;
    
    // Inputs is the list of variables that the action uses
    public List<Variable> Inputs { get; set; } = [];
    
    // Outputs is the list of variables that the action returns
    public List<Variable> Outputs { get; set; } = [];
}