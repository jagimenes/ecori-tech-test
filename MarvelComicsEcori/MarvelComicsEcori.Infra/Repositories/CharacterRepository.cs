using MarvelComicsEcori.Domain.Entities;
using MarvelComicsEcori.Domain.Enum;
using MarvelComicsEcori.Domain.Repositories;

namespace MarvelComicsEcori.Infra.Repositories;

public class CharacterRepository : ICharacterRepository
{
    public Task<List<CharacterEntity>> GetAll(
        string? name,
        string? nameStartsWith,
        DateTime? modifiedSince,
        int? comics,
        int? series,
        int? events,
        int? stories,
        ModifiedEnum? orderBy,
        int? limit,
        int? offset
    )
    {
        throw new NotImplementedException();
    }

    public Task<CharacterEntity> GetById(int id)
    {
        throw new NotImplementedException();
    }
}