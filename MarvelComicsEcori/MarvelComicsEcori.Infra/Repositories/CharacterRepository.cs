using MarvelComicsEcori.Domain.Entities;
using MarvelComicsEcori.Domain.Enum;
using MarvelComicsEcori.Domain.Repositories;
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

    public async Task<List<CharacterEntity>> GetAll(string? name = null, string? nameStartsWith = null, DateTime? modifiedSince = null, int? comics = null, int? series = null, int? events = null, int? stories = null, ModifiedEnum? orderBy = null, int? limit = null, int? offset = null)
    {
        HttpResponseMessage response = await _httpClient.GetAsync(MountUrl());
        string json = await response.Content.ReadAsStringAsync();
        ///var result = JsonConvert.DeserializeObject<T>(json); ///Create DTO para serializar
        var i = 0;
        throw new NotImplementedException();
    }

    public Task<CharacterEntity> GetById(int id)
    {
        throw new NotImplementedException();
    }

    private string MountUrl()
    {
        string apiUrl = _configuration.GetValue<string>("MarvelApiUrl");
        string ts = _configuration.GetValue<string>("MarvelApiTs");
        string apiKey = _configuration.GetValue<string>("MarvelApiKey");
        string hash = _configuration.GetValue<string>("MarvelApiHash");
        return $"http://gateway.marvel.com/v1/public/characters?ts=1&apikey=1a846bed8c30d9027d631725b081bac7&hash=e140159f8961d5c2e35f628ebceb5775";
    }
}