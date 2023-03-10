using MarvelComicsEcori.Domain.Entities;
using MarvelComicsEcori.Domain.Enum;

namespace MarvelComicsEcori.Domain.Repositories;

public interface ICharacterRepository
{
    Task<List<CharacterEntity>> GetAll(
        string? name = null,
        string? nameStartsWith = null,
        DateTime? modifiedSince = null,
        int? comics = null,
        int? series = null,
        int? events = null,
        int? stories = null,
        ModifiedEnum? orderBy = null,
        int? limit = null,
        int? offset = null
    );

    Task<CharacterEntity> GetById(int id);
}