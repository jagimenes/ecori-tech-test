using MarvelComicsEcori.Domain.Entities;
using MarvelComicsEcori.Domain.Enum;

namespace MarvelComicsEcori.Domain.Repositories;

public interface ICharacterRepository
{
    Task<List<CharacterEntity>> GetAll(
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
    );

    Task<CharacterEntity> GetById(int id);
}