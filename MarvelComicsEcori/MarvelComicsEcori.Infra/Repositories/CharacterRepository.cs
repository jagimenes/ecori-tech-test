using MarvelComicsEcori.Domain.Enum;
using MarvelComicsEcori.Domain.Repositories;
using MarvelComicsEcori.Domain.Serializers;
using Microsoft.AspNetCore.WebUtilities;
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

    public async Task<CharacterReturnDto> GetAll(
        string? name = null,
        string? nameStartsWith = null,
        DateTime? modifiedSince = null,
        int? comics = null,
        int? series = null,
        int? events = null,
        int? stories = null,
        ModifiedEnum? orderBy = null,
        int? Take = null,
        int? Skip = null)
    {
        var orderByValue = GetString.GetValueEnum(orderBy.ToString());
        var query = new Dictionary<string, string>()
        {
            ["name"] = name,
            ["nameStartsWith"] = nameStartsWith,
            ["modifiedSince"] = modifiedSince?.ToString("yyyy-MM-ddTHH:mm:sszzz"),
            ["comics"] = comics?.ToString() ?? null,
            ["series"] = series?.ToString() ?? null,
            ["events"] = events?.ToString() ?? null,
            ["stories"] = stories?.ToString() ?? null,
            ["orderBy"] = orderByValue,
            ["limit"] = Take?.ToString() ?? null,
            ["offset"] = (Skip * Take)?.ToString() ?? null,
        };
        var uri = QueryHelpers.AddQueryString(MountUrl("characters"), query);
        HttpResponseMessage response = await _httpClient.GetAsync(uri);
        string json = await response.Content.ReadAsStringAsync();
        var result = JsonConvert.DeserializeObject<CharacterReturnDto>(json);
        result.Data.Skip = Skip ?? 0;
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
        return $"http://gateway.marvel.com/v1/public/{route}?ts=1&apikey=1a846bed8c30d9027d631725b081bac7&hash=e140159f8961d5c2e35f628ebceb5775";
    }
}