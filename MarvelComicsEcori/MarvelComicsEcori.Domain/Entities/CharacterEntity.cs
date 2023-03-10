using MarvelComicsEcori.Domain.VOs;

namespace MarvelComicsEcori.Domain.Entities;

public class CharacterEntity
{
    public int Id { get; private set; }
    public string Name { get; private set; }
    public string Description { get; private set; }
    public DateTime Modified { get; private set; }
    public string ResourceURL { get; private set; }
    public List<UrlVo> Urls { get; private set; }
    public ImageVo Thumbnail { get; private set; }
    public List<ComicVo> Comics { get; private set; }
    public List<StoryVo> Storys { get; private set; }
    public List<SeriesSummaryVo> Series { get; private set; }
}