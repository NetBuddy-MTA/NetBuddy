using Marten.Schema;

namespace NetBuddy.Server.Models.Executables.Action;

public sealed class Selector
{
    [Identity]
    public Guid Id { get; set; }
    
    public string Url { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    
    public string ComponentId { get; set; } = string.Empty;
    public bool UseComponentId { get; set; } = false;
    
    public string XPath { get; set; } = string.Empty;
    public bool UseXPath { get; set; } = true;
    
    public string CssSelector { get; set; } = string.Empty;
    public bool UseCssSelector { get; set; } = false;
}