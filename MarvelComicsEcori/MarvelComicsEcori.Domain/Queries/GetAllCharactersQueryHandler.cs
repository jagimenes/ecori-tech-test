using MarvelComicsEcori.Domain.Repositories;
using MarvelComicsEcori.Domain.Serializers;
using MediatR;

namespace MarvelComicsEcori.Domain.Queries;

public class GetAllCharactersQueryHandler : IRequestHandler<GetAllCharactersQuery, CharacterReturnDto>
{
    private readonly ICharacterRepository _characterRepository;

    public GetAllCharactersQueryHandler(ICharacterRepository characterRepository)
    {
        _characterRepository = characterRepository;
    }

    public async Task<CharacterReturnDto> Handle(GetAllCharactersQuery request, CancellationToken cancellationToken)
    {
        var result = await _characterRepository.GetAll(
            request.Name,
            request.NameStartsWith,
            request.ModifiedSince,
            request.Comics,
            request.Series,
            request.Events,
            request.Stories,
            request.OrderBy,
            request.Take,
            request.Skip
        );
        return result;
    }
}