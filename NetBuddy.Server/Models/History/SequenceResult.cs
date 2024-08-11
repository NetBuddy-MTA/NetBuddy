using Marten.Schema;
using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.Models.History;

public class SequenceResult
{
    // End time
    public DateTime EndAt;

    // List of Action results
    public List<ActionResult> Results;

    // Start time
    public DateTime StartAt;

    // Id is the primary key
    [Identity] public Guid Id { get; set; }

    // Sequence id
    public Guid SequenceId { get; set; }

    // Owner
    public UserAccount? Owner { get; set; }
}