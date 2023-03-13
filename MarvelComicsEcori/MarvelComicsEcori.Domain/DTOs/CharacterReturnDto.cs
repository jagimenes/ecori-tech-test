using MarvelComicsEcori.Domain.DTOs;
using Newtonsoft.Json;

namespace MarvelComicsEcori.Domain.Serializers;

public class CharacterReturnDto
{
    [JsonProperty("code")]
    public int Code { get; set; }

    [JsonProperty("status")]
    public string Status { get; set; }

    [JsonProperty("data")]
    public DataCharacterDto Data { get; set; }
}