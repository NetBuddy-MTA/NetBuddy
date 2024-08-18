using NetBuddy.Server.Models.Executables.Action;
using Action = NetBuddy.Server.Models.Executables.Action.Action;

namespace NetBuddy.Server.Models.History;

public sealed class ActionResult
{
    public DateTime EndAt { get; set; }

    public Action Action { get; set; }

    public Dictionary<Variable, string> ActionContext { get; set; }

    public List<KeyValuePair<string, string>> ActionLogs { get; set; }

    public Dictionary<Variable, string> ActionOutputs { get; set; }
}