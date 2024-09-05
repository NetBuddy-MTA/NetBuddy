using Marten.Schema;
using NetBuddy.Server.DTOs.History;
using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.Models.History;

public class SequenceResult
{
    // End time
    public DateTime EndAt { get; set; }

    // List of Action results
    public List<ActionResult> Results { get; set; }

    // Start time
    public DateTime StartAt { get; set; }

    // Id is the primary key
    [Identity] public Guid Id { get; set; }

    // Sequence id
    public Guid SequenceId { get; set; }

    // Owner
    public UserAccount? Owner { get; set; }

    public ResultDto ToDto()
    {
        return new ResultDto
        {
            Id = Id,
            StartAt = StartAt,
            EndAt = EndAt,
            SequenceId = SequenceId,
            Results = Results
        };
    }
}