using Marten.Schema;

namespace NetBuddy.Server.Models.Executables.Sequence;

public sealed class SequenceVariable
{
    [Identity]
    public Guid Id;
    
    public string OriginalName { get; set; } = string.Empty;
    
    public string Name { get; set; } = string.Empty;
    
    public string Type { get; set; } = string.Empty;
    
    public bool Optional { get; set; } = false;
    
    public string? DefaultValue { get; set; } = null;
}