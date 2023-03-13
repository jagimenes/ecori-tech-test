namespace MarvelComicsEcori.Domain.VOs;

public class ImageVo
{
    public ImageVo(string path, string extension)
    {
        Path = path;
        Extension = extension;
    }

    public string Path { get; private set; }
    public string Extension { get; private set; }

    public override string ToString()
    {
        return Path;
    }
}