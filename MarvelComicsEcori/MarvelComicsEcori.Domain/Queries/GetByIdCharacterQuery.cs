using MarvelComicsEcori.Domain.Serializers;
using MediatR;

namespace MarvelComicsEcori.Domain.Queries;

public class GetByIdCharacterQuery : IRequest<CharacterReturnDto>
{
    public int Id { get; set; }

    public GetByIdCharacterQuery(int id)
    {
        Id = id;
    }
}