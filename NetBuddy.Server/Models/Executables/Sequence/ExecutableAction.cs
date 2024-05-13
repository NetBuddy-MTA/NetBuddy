using Marten.Schema;

namespace NetBuddy.Server.Models.Executables.Sequence;

public sealed class ExecutableAction
{
    [Identity] 
    public Guid Id;
    
    // The associated ActionString on the extension
    public string ActionString { get; set; } = string.Empty;
    
    // The inputs for the action
    public List<SequenceVariable> Inputs { get; set; } = [];
    
    // The outputs for the action
    public List<SequenceVariable> Outputs { get; set; } = [];
}