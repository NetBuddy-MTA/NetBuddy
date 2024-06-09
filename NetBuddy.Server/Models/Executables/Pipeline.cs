using Marten.Schema;
using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.Models.Executables;

public sealed class Pipeline
{
    [Identity] public Guid Id { get; set; }

    public Sequence.Sequence Sequence { get; set; }

    public Dictionary<string, string> Context { get; set; } = new();

    public bool IsRunning { get; set; }

    public bool IsFinished { get; set; }

    public UserAccount? Owner { get; set; }
}