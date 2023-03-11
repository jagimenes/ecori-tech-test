using MarvelComicsEcori.Domain.Enum;
using MarvelComicsEcori.Domain.Serializers;
using MediatR;

namespace MarvelComicsEcori.Domain.Queries;

public class GetAllCharactersQuery : IRequest<CharacterReturnDto>
{
    public GetAllCharactersQuery()
    {
    }

    public GetAllCharactersQuery(string? name, string? nameStartsWith, DateTime? modifiedSince, int? comics, int? series, int? events, int? stories, ModifiedEnum? orderBy, int? take, int? skip)
    {
        Name = name;
        NameStartsWith = nameStartsWith;
        ModifiedSince = modifiedSince;
        Comics = comics;
        Series = series;
        Events = events;
        Stories = stories;
        OrderBy = orderBy;
        Take = take;
        Skip = skip;
    }

    public string? Name { get; set; }
    public string? NameStartsWith { get; set; }
    public DateTime? ModifiedSince { get; set; }
    public int? Comics { get; set; }
    public int? Series { get; set; }
    public int? Events { get; set; }
    public int? Stories { get; set; }
    public ModifiedEnum? OrderBy { get; set; }
    public int? Take { get; set; }
    public int? Skip { get; set; }
}