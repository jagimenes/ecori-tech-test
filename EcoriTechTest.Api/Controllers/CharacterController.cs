using EcoriTechTest.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace EcoriTechTest.Api.Controllers
{
    [Route("[controller]")]
    public class CharacterController : Controller
    {
        private readonly CharacterService _characterService;

        public CharacterController(CharacterService characterService)
        {
            _characterService = characterService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var queryString = Request.QueryString.ToString();
                var result = await _characterService.Get(queryString);

                return Ok(result);
            }

            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var result = await _characterService.Get(id);
                return Ok(result);
            }

            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
