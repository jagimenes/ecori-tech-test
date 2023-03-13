using Newtonsoft.Json;

namespace MarvelComicsEcori.Domain.DTOs;

public class DataCharacterDto
{
    public DataCharacterDto()
    {
        Results = new List<ResultsCharacterDto>();
    }

    public int Skip { get; set; }

    [JsonProperty("limit")]
    public int Take { get; set; }

    [JsonProperty("total")]
    public int Total { get; set; }

    [JsonProperty("count")]
    public int Count { get; set; }

    [JsonProperty("results")]
    public List<ResultsCharacterDto> Results { get; set; }
}