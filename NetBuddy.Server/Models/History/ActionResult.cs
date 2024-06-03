using NetBuddy.Server.Models.Executables.Action;
using Action = System.Action;

namespace NetBuddy.Server.Models.History;

public sealed class ActionResult
{
    public Action Action { get; set; }

    public Dictionary<Variable, object> ActionContext { get; set; }
}