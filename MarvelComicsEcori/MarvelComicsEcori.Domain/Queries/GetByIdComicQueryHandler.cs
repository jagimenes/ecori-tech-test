using MarvelComicsEcori.Domain.DTOs;
using MarvelComicsEcori.Domain.Repositories;
using MediatR;

namespace MarvelComicsEcori.Domain.Queries;

public class GetByIdComicQueryHandler : IRequestHandler<GetByIdComicQuery, ComicsReturnDto>
{
    private readonly IComicRepository _comicRepository;

    public GetByIdComicQueryHandler(IComicRepository comicRepository)
    {
        _comicRepository = comicRepository;
    }

    public async Task<ComicsReturnDto> Handle(GetByIdComicQuery request, CancellationToken cancellationToken)
    {
        var result = await _comicRepository.GetById(request.Id);
        return result;
    }
}