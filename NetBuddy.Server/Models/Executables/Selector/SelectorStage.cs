namespace NetBuddy.Server.Models.Executables.Selector;

public sealed class SelectorStage
{
    // the html element tag
    public string Tag { get; set; } = string.Empty;

    // the attributes on the html element
    public Dictionary<string, string> Attributes { get; set; } = new();

    // whether to use the attribute or not
    public Dictionary<string, bool> UseAttributes { get; set; } = new();

    // if this stage should be included in the selector or not
    public bool InUse { get; set; } = true;
}