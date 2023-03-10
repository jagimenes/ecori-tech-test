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

    public Task<List<CharacterEntity>> Handle(GetAllCharactersQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}