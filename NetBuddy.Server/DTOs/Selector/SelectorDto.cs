using NetBuddy.Server.Models.Executables.Selector;

namespace NetBuddy.Server.DTOs.Selector;

public sealed class SelectorDto
{
    public string Id { get; set; }

    public string Url { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public SelectorStage[] Stages { get; set; } = [];
}