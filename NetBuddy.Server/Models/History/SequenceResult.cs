using Marten.Schema;

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
}