using MarvelComicsEcori.Domain.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace MarvelComicsEcori.App.Controllers;

[Route("api/v1")]
public class ComicControler : ControllerBase
{
    private readonly IMediator _mediator;

    public ComicControler(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("comic/{idCharacter:int}")]
    public async Task<IActionResult> GetById(int idCharacter)
    {
        var query = new GetByIdComicQuery(idCharacter);
        var comics = await _mediator.Send(query);
        return Ok(comics);
    }
}