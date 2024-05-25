namespace NetBuddy.Server.Models.Executables.Sequence;

public sealed class SequenceVariable
{
    public string OriginalName { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string Type { get; set; } = string.Empty;

    public bool Optional { get; set; } = false;

    public string? DefaultValue { get; set; } = null;
}