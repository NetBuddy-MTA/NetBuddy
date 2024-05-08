using NetBuddy.Server.Models.Executables.Sequence;

namespace NetBuddy.Server.DTOs.Execution;

public class SequenceResultDto
{
    public Sequence Sequence { get; set; } 
    
    public List<ActionResultDto> Results { get; set; } = [];
}