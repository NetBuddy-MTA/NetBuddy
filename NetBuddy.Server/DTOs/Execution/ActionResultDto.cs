using Action = NetBuddy.Server.Models.Executables.Action.Action;

namespace NetBuddy.Server.DTOs.Execution;

public sealed class ActionResultDto
{
    public Action Action { get; set; }

    public Dictionary<string, string> Inputs { get; set; } = [];

    public Dictionary<string, string> Outputs { get; set; } = [];
    
    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }
}