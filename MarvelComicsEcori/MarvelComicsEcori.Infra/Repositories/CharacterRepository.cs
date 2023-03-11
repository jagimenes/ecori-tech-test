using MarvelComicsEcori.Domain.Entities;
using MarvelComicsEcori.Domain.Enum;
using MarvelComicsEcori.Domain.Repositories;
using MarvelComicsEcori.Domain.Serializers;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace MarvelComicsEcori.Infra.Repositories;

public class CharacterRepository : ICharacterRepository
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public CharacterRepository(IConfiguration configuration, HttpClient httpClient)
    {
        _configuration = configuration;
        _httpClient = httpClient;
    }

    public async Task<CharacterReturnDto> GetAll(string? name = null, string? nameStartsWith = null, DateTime? modifiedSince = null, int? comics = null, int? series = null, int? events = null, int? stories = null, ModifiedEnum? orderBy = null, int? limit = null, int? offset = null)
    {
        HttpResponseMessage response = await _httpClient.GetAsync(MountUrl("characters"));
        string json = await response.Content.ReadAsStringAsync();
        var result = JsonConvert.DeserializeObject<CharacterReturnDto>(json);
        return result;
    }

    public async Task<CharacterReturnDto> GetById(int id)
    {
        HttpResponseMessage response = await _httpClient.GetAsync(MountUrl($"characters/{id}"));
        string json = await response.Content.ReadAsStringAsync();
        var result = JsonConvert.DeserializeObject<CharacterReturnDto>(json);
        return result;
    }

    private string MountUrl(string route)
    {
        string apiUrl = _configuration.GetValue<string>("MarvelApiUrl");
        string ts = _configuration.GetValue<string>("MarvelApiTs");
        string apiKey = _configuration.GetValue<string>("MarvelApiKey");
        string hash = _configuration.GetValue<string>("MarvelApiHash");
        return $"http://gateway.marvel.com/v1/public/{route}?ts=1&apikey=1a846bed8c30d9027d631725b081bac7&hash=e140159f8961d5c2e35f628ebceb5775";
    }
}