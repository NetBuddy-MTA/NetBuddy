using Marten.Schema;

namespace NetBuddy.Server.Models.Executables.Action;

public sealed class Variable
{
    public string Name { get; set; } = string.Empty;
    
    public string Description { get; set; } = string.Empty;
    
    public string Type { get; set; } = string.Empty;

    public bool Optional { get; set; } = false;
    
    public string? DefaultValue { get; set; } = null;
}