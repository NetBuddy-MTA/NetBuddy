using Marten.Schema;
using NetBuddy.Server.DTOs.Selector;
using NetBuddy.Server.Models.User;

namespace NetBuddy.Server.Models.Executables.Selector;

public sealed class Selector
{
    [Identity] public Guid Id { get; set; }

    public string Url { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    public SelectorStage[] Stages { get; set; } = [];

    public UserAccount? Owner { get; set; }

    public static Selector FromDto(SelectorDto dto, UserAccount userAccount)
    {
        return new Selector
        {
            Id = Guid.Parse(dto.Id),
            Url = dto.Url,
            Name = dto.Name,
            Stages = dto.Stages,
            Owner = userAccount
        };
    }

    public SelectorDto Dto()
    {
        return new SelectorDto
        {
            Id = Id.ToString(),
            Url = Url,
            Name = Name,
            Stages = Stages
        };
    }
}