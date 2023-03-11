using MarvelComicsEcori.Domain.Enum;
using MarvelComicsEcori.Domain.Serializers;

namespace MarvelComicsEcori.Domain.Repositories;

public interface ICharacterRepository
{
    Task<CharacterReturnDto> GetAll(
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

    Task<CharacterReturnDto> GetById(int id);
}