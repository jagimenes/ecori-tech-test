using MarvelComicsEcori.Domain.VOs;
using Newtonsoft.Json;

namespace MarvelComicsEcori.Domain.DTOs;

public class ResultComicsDto
{
    [JsonProperty("id")]
    public int Id { get; set; }

    [JsonProperty("digitalId")]
    public int DigitalId { get; set; }

    [JsonProperty("title")]
    public string Title { get; set; }

    [JsonProperty("issueNumber")]
    public int IssueNumber { get; set; }

    [JsonProperty("variantDescription")]
    public string VariantDescription { get; set; }

    [JsonProperty("description")]
    public string Description { get; set; }

    [JsonProperty("modified")]
    public DateTime Modified { get; set; }

    [JsonProperty("isbn")]
    public string Isbn { get; set; }

    [JsonProperty("upc")]
    public string Upc { get; set; }

    [JsonProperty("diamondCode")]
    public string DiamondCode { get; set; }

    [JsonProperty("ean")]
    public string Ean { get; set; }

    [JsonProperty("issn")]
    public string Issn { get; set; }

    [JsonProperty("format")]
    public string Format { get; set; }

    [JsonProperty("pageCount")]
    public int PageCount { get; set; }

    [JsonProperty("resourceURI")]
    public string ResourceURI { get; set; }

    [JsonProperty("urls")]
    public List<UrlVo> Urls { get; set; }
}