namespace MarvelComicsEcori.Domain.VOs;

public class UrlVo
{
    public UrlVo(string type, string url)
    {
        Type = type;
        Url = url;
    }

    public string Type { get; private set; }
    public string Url { get; private set; }

    public override string ToString()
    {
        return Url;
    }
}