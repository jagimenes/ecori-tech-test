using MarvelComicsEcori.Domain.DTOs;

namespace MarvelComicsEcori.Domain.Repositories;

public interface IComicRepository
{
    Task<ComicsReturnDto> GetById(int id);
}