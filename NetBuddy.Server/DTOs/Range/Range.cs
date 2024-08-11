using Microsoft.AspNetCore.Mvc;

namespace NetBuddy.Server.DTOs.Range;

[BindProperties]
public class Range
{
    public int From;
    public int To;
}