using Marten.Schema;
using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.Models.Executables.Selector;

public sealed class Selector
{
    [Identity] public Guid Id { get; set; }

    public string Url { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    public SelectorStage[] Stages { get; set; } = [];

    public UserAccount? Owner { get; set; }

    public dynamic Dto => new
    {
        Id,
        Url,
        Name,
        Stages
    };
}