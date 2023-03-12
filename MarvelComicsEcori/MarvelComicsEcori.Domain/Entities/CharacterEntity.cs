using MarvelComicsEcori.Domain.VOs;

namespace MarvelComicsEcori.Domain.Entities;

public class CharacterEntity
{
    public CharacterEntity()
    {
        Urls = new List<UrlVo>();
    }

    public long Id { get; private set; }

    public string Name { get; private set; }

    public string Description { get; private set; }

    public DateTime Modified { get; private set; }

    public string ResourceURI { get; private set; }

    public List<UrlVo> Urls { get; private set; }

    public ImageVo Thunbnail { get; private set; }

    public ComicVo Comics { get; private set; }

    public StoryVo Storys { get; private set; }

    public SeriesVo Series { get; private set; }
}