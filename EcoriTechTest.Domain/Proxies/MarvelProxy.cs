using EcoriTechTest.Domain.HttpClients;
using EcoriTechTest.Domain.Model.Dtos;
using EcoriTechTest.Domain.Model.Entities;
using EcoriTechTest.Domain.Model.Helpers;
using EcoriTechTest.Domain.Model.Interfaces;
using System.Text.Json;

namespace EcoriTechTest.Domain.Proxies
{
    public class MarvelProxy
    {
        private readonly MarvelHttpClient _httpClient;

        public MarvelProxy(MarvelHttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<DataWrapper<T>> Get<T>(string queryString = null) where T : IEntity
        {
            var url = GetUrl<T>(queryString);
            return await SendRequest<DataWrapper<T>>(HttpMethod.Get, url);
        }

        public async Task<DataWrapper<T>> Get<T>(int id) where T : IEntity
        {
            var url = GetUrl<T>(id);
            return await SendRequest<DataWrapper<T>>(HttpMethod.Get, url);
        }

        public async Task<T> SendRequest<T>(HttpMethod httpMethod, string url)
        {
            var request = GetRequestMessage(httpMethod, url);
            var response = await _httpClient.SendAsync(request);
            var contents = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
                return JsonHelper.Deserialize<T>(contents);

            var dataError = JsonHelper.Deserialize<DataError>(contents);
            throw new Exception(dataError?.ToString());
        }

        private string GetAuthApi()
        {
            var timestamp = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds();
            var hash = CryptographyHelper.GenerateMD5($"{timestamp}{_httpClient.PrivateKey}{_httpClient.PublicKey}");
            return $"ts={timestamp}&apikey={_httpClient.PublicKey}&hash={hash.ToLower()}";
        }

        private string GetUrl<T>(string queryString) where T : IEntity
        {
            var url = $"/{GetEndpoint<T>()}?{GetAuthApi()}";
            if (!string.IsNullOrEmpty(queryString))
                url += "&" + queryString;

            return url;
        }

        private string GetUrl<T>(int id) where T : IEntity
        {
            return $"/{GetEndpoint<T>()}/{id}?{GetAuthApi()}";
        }

        private HttpRequestMessage GetRequestMessage(HttpMethod httpMethod, string url)
        {
            return new HttpRequestMessage
            {
                Method = httpMethod,
                RequestUri = new Uri($"{_httpClient.BaseAddress}{url}"),
            };
        }

        private string GetEndpoint<T>() where T : IEntity
        {
            return typeof(T) switch
            {
                var character when character == typeof(Character) => "characters",
                _ => throw new NotImplementedException(),
            };
        }
    }
}
