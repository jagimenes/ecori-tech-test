using MarvelComicsEcori.Domain.Repositories;
using MarvelComicsEcori.Domain.Serializers;
using MediatR;

namespace MarvelComicsEcori.Domain.Queries;

public class GetAllCharactersQueryHandle : IRequestHandler<GetAllCharactersQuery, CharacterReturnDto>
{
    private readonly ICharacterRepository _characterRepository;

    public GetAllCharactersQueryHandle(ICharacterRepository characterRepository)
    {
        _characterRepository = characterRepository;
    }

    public async Task<CharacterReturnDto> Handle(GetAllCharactersQuery request, CancellationToken cancellationToken)
    {
        var result = await _characterRepository.GetAll();
        return result;
    }
}