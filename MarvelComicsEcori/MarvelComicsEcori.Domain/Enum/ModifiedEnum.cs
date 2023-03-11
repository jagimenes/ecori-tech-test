namespace MarvelComicsEcori.Domain.Enum;

public enum ModifiedEnum
{
    Name,

    Modified,

    _Name,

    _Modified,
}

public static class GetString
{
    public static string GetValueEnum(string value)
    {
        switch (value)
        {
            case "Name":
                return "name";

            case "Modified":
                return "modified";

            case "_Name":
                return "-name";

            case "_Modified":
                return "-modified";

            default:
                return null;
        }
    }
}