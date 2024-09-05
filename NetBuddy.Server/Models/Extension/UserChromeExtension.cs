using Marten.Schema;

namespace NetBuddy.Server.Models.Extension;

public class UserChromeExtension
{
    public UserChromeExtension(string email, string extensionId)
    {
        Email = email;
        ExtensionId = extensionId;
    }

    [Identity] public string Email { get; set; }
    public string ExtensionId { get; set; }
}