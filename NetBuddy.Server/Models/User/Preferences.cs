using Marten.Schema;

namespace NetBuddy.Server.Models.User;

public sealed class Preferences
{
    [Identity] 
    public string Email { get; set; } = string.Empty;

    public bool DarkMode { get; set; } = false;

    public bool AutoSave { get; set; } = true;
    
    public int AutoSaveInterval { get; set; } = 5; // minutes
}