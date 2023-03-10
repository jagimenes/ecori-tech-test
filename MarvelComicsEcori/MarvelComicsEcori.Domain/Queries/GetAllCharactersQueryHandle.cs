using MarvelComicsEcori.Domain.Entities;
using MarvelComicsEcori.Domain.Repositories;
using MediatR;

namespace MarvelComicsEcori.Domain.Queries;

public class GetAllCharactersQueryHandle : IRequestHandler<GetAllCharactersQuery, List<CharacterEntity>>
{
    private readonly ICharacterRepository _characterRepository;

    public GetAllCharactersQueryHandle(ICharacterRepository characterRepository)
    {
        _characterRepository = characterRepository;
    }

    public async Task<List<CharacterEntity>> Handle(GetAllCharactersQuery request, CancellationToken cancellationToken)
    {
        var opa = await _characterRepository.GetAll();
        throw new NotImplementedException();
    }
}