using EcoriTechTest.Domain.Model.Entities;

namespace EcoriTechTest.Domain.Model.Dtos
{
    public class CharacterDataContainer
    {
        public int Offset { get; set; }

        public int Limit { get; set; }

        public int Total { get; set; }

        public int Count { get; set; }

        public List<Character> Results { get; set; }
    }
}
