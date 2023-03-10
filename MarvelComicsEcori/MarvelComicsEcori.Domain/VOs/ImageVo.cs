namespace MarvelComicsEcori.Domain.VOs;

public class ImageVo
{
    public string Path { get; private set; }
    public string Extension { get; private set; }

    public override string ToString()
    {
        return $"{Path}{Extension}";
    }
}