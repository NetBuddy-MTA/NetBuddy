using Marten.Schema;
using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.Models.Preset;

public sealed class Preset
{
    [Identity] public Guid Id;

    public string Name { get; set; }

    public string Description { get; set; }

    public Guid SequenceId { get; set; }

    public Dictionary<string, string> Context { get; set; } = new();

    public UserAccount? Owner { get; set; }
}