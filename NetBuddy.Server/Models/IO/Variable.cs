using Marten.Schema;

namespace NetBuddy.Server.Models.IO;

public class Variable
{
    [Identity]
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string DefaultValue { get; set; } = string.Empty;
    public bool Required { get; set; } = false;
}