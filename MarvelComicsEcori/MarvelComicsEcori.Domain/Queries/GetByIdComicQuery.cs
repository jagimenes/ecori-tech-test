using MarvelComicsEcori.Domain.DTOs;
using MediatR;

namespace MarvelComicsEcori.Domain.Queries;

public class GetByIdComicQuery : IRequest<ComicsReturnDto>
{
    public GetByIdComicQuery(int id)
    {
        Id = id;
    }

    public int Id { get; set; }
}