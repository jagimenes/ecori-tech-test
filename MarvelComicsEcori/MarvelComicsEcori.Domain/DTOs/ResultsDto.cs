using MarvelComicsEcori.Domain.VOs;
using Newtonsoft.Json;

namespace MarvelComicsEcori.Domain.DTOs;

public class ResultsDto
{
    public ResultsDto()
    {
        Urls = new List<UrlVo>();
    }

    [JsonProperty("id")]
    public long Id { get; private set; }

    [JsonProperty("name")]
    public string Name { get; private set; }

    [JsonProperty("description")]
    public string Description { get; private set; }

    [JsonProperty("modified")]
    public DateTime Modified { get; private set; }

    [JsonProperty("resourceURI")]
    public string ResourceURI { get; private set; }

    [JsonProperty("urls")]
    public List<UrlVo> Urls { get; private set; }

    [JsonProperty("thumbnail")]
    public ImageVo Thunbnail { get; private set; }

    [JsonProperty("comics")]
    public ComicVo Comics { get; private set; }

    public StoryVo Storys { get; private set; }

    [JsonProperty("series")]
    public SeriesVo Series { get; private set; }
}