using Newtonsoft.Json;

namespace MarvelComicsEcori.Domain.DTOs;

public class DataDto
{
    public DataDto()
    {
        Results = new List<ResultsDto>();
    }

    [JsonProperty("offset")]
    public int Offset { get; set; }

    [JsonProperty("limit")]
    public int Limit { get; set; }

    [JsonProperty("total")]
    public int Total { get; set; }

    [JsonProperty("count")]
    public int Count { get; set; }

    [JsonProperty("results")]
    public List<ResultsDto> Results { get; set; }
}