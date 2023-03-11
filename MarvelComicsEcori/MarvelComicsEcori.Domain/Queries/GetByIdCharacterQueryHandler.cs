using MarvelComicsEcori.Domain.Repositories;
using MarvelComicsEcori.Domain.Serializers;
using MediatR;

namespace MarvelComicsEcori.Domain.Queries;

public class GetByIdCharacterQueryHandler : IRequestHandler<GetByIdCharacterQuery, CharacterReturnDto>
{
    private readonly ICharacterRepository _characterRepository;

    public GetByIdCharacterQueryHandler(ICharacterRepository characterRepository)
    {
        _characterRepository = characterRepository;
    }

    public async Task<CharacterReturnDto> Handle(GetByIdCharacterQuery request, CancellationToken cancellationToken)
    {
        var result = await _characterRepository.GetById(request.Id);
        return result;
    }
}