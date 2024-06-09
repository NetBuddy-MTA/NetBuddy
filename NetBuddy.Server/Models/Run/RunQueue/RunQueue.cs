using Marten.Schema;
using NetBuddy.Server.Models.Executables;

namespace NetBuddy.Server.Models.Run.RunQueue;

public sealed class RunQueue
{
    // the owning user
    [Identity] public string UserId { get; set; } = string.Empty;

    // the queue itself
    public Queue<Pipeline> ToRun { get; } = [];
}