using MarvelComicsEcori.Domain.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace MarvelComicsEcori.App.Controllers;

public class Params
{
    public int Id { get; set; }
    public string Name { get; set; }
}

[Route("api/v1")]
public class CharacterControler : ControllerBase
{
    private readonly IMediator _mediator;

    public CharacterControler(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("character")]
    public async Task<IActionResult> GetAll([FromQuery] GetAllCharactersQuery query)
    {
        var allCharacters = await _mediator.Send(query);
        return Ok(allCharacters);
    }

    [HttpGet("character/{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var query = new GetByIdCharacterQuery(id);
        var character = await _mediator.Send(query);
        return Ok(character);
    }
}