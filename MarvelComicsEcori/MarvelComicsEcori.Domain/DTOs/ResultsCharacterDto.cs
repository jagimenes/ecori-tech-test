using MarvelComicsEcori.Domain.VOs;
using Newtonsoft.Json;

namespace MarvelComicsEcori.Domain.DTOs;

public class ResultsCharacterDto
{
    public ResultsCharacterDto()
    {
        Urls = new List<UrlVo>();
    }

    [JsonProperty("id")]
    public long Id { get; set; }

    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonProperty("description")]
    public string Description { get; set; }

    [JsonProperty("modified")]
    public string Modified { get; set; }

    [JsonProperty("resourceURI")]
    public string ResourceURI { get; set; }

    [JsonProperty("urls")]
    public List<UrlVo> Urls { get; set; }

    [JsonProperty("thumbnail")]
    public ImageVo Thunbnail { get; set; }

    [JsonProperty("comics")]
    public ComicVo Comics { get; set; }

    public StoryVo Storys { get; set; }

    [JsonProperty("series")]
    public SeriesVo Series { get; set; }
}