using EcoriTechTest.Domain.Model.Converters;
using System.Text.Json;

namespace EcoriTechTest.Domain.Model.Helpers
{
    public static class JsonHelper
    {
        public static string Serialize(object obj) {  return JsonSerializer.Serialize(obj, GetOptions()); }

        public static T Deserialize<T>(string json) 
        { 
            return !string.IsNullOrWhiteSpace(json) 
                ? JsonSerializer.Deserialize<T>(json, GetOptions())
                : default; 
        }

        public static JsonSerializerOptions GetOptions()
        {
            var options = new JsonSerializerOptions();
            options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            options.Converters.Add(new DateTimeOffsetConverter());
            return options;
        }
    }
}
