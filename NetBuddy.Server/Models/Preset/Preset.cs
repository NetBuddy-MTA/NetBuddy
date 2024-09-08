using Marten.Schema;
using NetBuddy.Server.DTOs.Execution;
using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.Models.Preset;

public sealed class Preset
{
    [Identity] public Guid Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public Guid SequenceId { get; set; }

    public Dictionary<string, string> Context { get; set; } = new();

    public UserAccount? Owner { get; set; }

    public DisplayPreset ToDisplayPreset()
    {
        return new DisplayPreset
        {
            Id = Id,
            Name = Name,
            Description = Description
        };
    }
}