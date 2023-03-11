using Newtonsoft.Json;

namespace MarvelComicsEcori.Domain.DTOs;

public class DataDto
{
    public DataDto()
    {
        Results = new List<ResultsDto>();
    }

    public int Skip { get; set; }

    [JsonProperty("limit")]
    public int Take { get; set; }

    [JsonProperty("total")]
    public int Total { get; set; }

    [JsonProperty("count")]
    public int Count { get; set; }

    [JsonProperty("results")]
    public List<ResultsDto> Results { get; set; }
}