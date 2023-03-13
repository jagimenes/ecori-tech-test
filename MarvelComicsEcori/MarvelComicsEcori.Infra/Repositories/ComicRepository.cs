using MarvelComicsEcori.Domain.DTOs;
using MarvelComicsEcori.Domain.Repositories;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace MarvelComicsEcori.Infra.Repositories;

public class ComicRepository : IComicRepository
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public ComicRepository(IConfiguration configuration, HttpClient httpClient)
    {
        _configuration = configuration;
        _httpClient = httpClient;
    }

    public async Task<ComicsReturnDto> GetById(int id)
    {
        HttpResponseMessage response = await _httpClient.GetAsync(MountUrl($"characters/{id}/comics"));
        string json = await response.Content.ReadAsStringAsync();
        var result = JsonConvert.DeserializeObject<ComicsReturnDto>(json);
        return result;
    }

    private string MountUrl(string route)
    {
        return $"http://gateway.marvel.com/v1/public/{route}?ts=1&apikey=1a846bed8c30d9027d631725b081bac7&hash=e140159f8961d5c2e35f628ebceb5775";
    }
}