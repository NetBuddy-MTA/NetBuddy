using Marten.Schema;

namespace NetBuddy.Server.Models.IO;

public class Variable
{
    // Id is the primary key
    [Identity]
    public Guid Id { get; set; }
    
    // Name is the display name
    public string Name { get; set; } = string.Empty;
    // Type is the type of the variable
    public string Type { get; set; } = string.Empty;
    // Description is the description of the variable (optional)
    public string Description { get; set; } = string.Empty;
    // DefaultValue is the default value of the variable (optional)
    public string DefaultValue { get; set; } = string.Empty;
    // Required is whether the variable is required or not
    public bool Required { get; set; } = false;
    
    // The context name of the variable, the value will be assigned to this name in the context
    public string ContextName { get; set; } = string.Empty; 
}