using NetBuddy.Server.Models.History;

namespace NetBuddy.Server.DTOs.History;

public sealed class ResultDto
{
    public Guid Id { get; set; }

    public DateTime StartAt { get; set; }

    public DateTime EndAt { get; set; }

    public Guid SequenceId { get; set; }

    public List<ActionResult> Results { get; set; }
}