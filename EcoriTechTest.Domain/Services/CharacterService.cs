using EcoriTechTest.Domain.Model.Dtos;
using EcoriTechTest.Domain.Model.Entities;
using EcoriTechTest.Domain.Proxies;

namespace EcoriTechTest.Domain.Services
{
    public class CharacterService
    {
        private readonly MarvelProxy _proxy;

        public CharacterService(MarvelProxy proxy)
        {
            _proxy = proxy;
        }

        public async Task<Character> Get(int id)
        {
            var dataWrapper = await _proxy.Get<Character>(id);
            return dataWrapper?.Data?.Results?.FirstOrDefault();
        }

        public async Task<DataContainer<Character>> Get(string queryString = null)
        {
            if(queryString?.First() == '?')
                queryString = queryString.Remove(0, 1);

            var dataWrapper = await _proxy.Get<Character>(queryString);
            return dataWrapper?.Data;
        }
    }
}