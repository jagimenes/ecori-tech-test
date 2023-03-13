using Newtonsoft.Json;

namespace MarvelComicsEcori.Domain.DTOs;

public class ComicsReturnDto
{
    [JsonProperty("code")]
    public int Code { get; set; }

    [JsonProperty("status")]
    public string Status { get; set; }

    [JsonProperty("data")]
    public DataCharacterDto Data { get; set; }
}