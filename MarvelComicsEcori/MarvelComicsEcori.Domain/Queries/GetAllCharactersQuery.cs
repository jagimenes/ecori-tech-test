using MarvelComicsEcori.Domain.Entities;
using MarvelComicsEcori.Domain.Enum;
using MediatR;

namespace MarvelComicsEcori.Domain.Queries;

public class GetAllCharactersQuery : IRequest<List<CharacterEntity>>
{
    public string? Name { get; private set; }
    public string? NameStartsWith { get; private set; }
    public DateTime? ModifiedSince { get; private set; }
    public int? Comics { get; private set; }
    public int? Series { get; private set; }
    public int? Events { get; private set; }
    public int? Stories { get; private set; }
    public ModifiedEnum? OrderBy { get; private set; }
    public int? Limit { get; private set; }
    public int? Offset { get; private set; }
}