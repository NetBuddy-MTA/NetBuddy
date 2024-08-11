using Marten.Schema;

namespace NetBuddy.Server.Models.Run.RunQueue;

public sealed class RunQueue
{
    // the owning user
    [Identity] public string UserId { get; set; } = string.Empty;

    // the queue itself
    public Guid[] ToRun { get; set; } = [];
}