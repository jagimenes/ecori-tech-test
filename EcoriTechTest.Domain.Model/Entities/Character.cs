using EcoriTechTest.Domain.Model.Interfaces;
using EcoriTechTest.Domain.Model.ValueObjects;

namespace EcoriTechTest.Domain.Model.Entities
{
    public class Character : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTimeOffset Modified { get; set; }

        public string ResourceURI { get; set; }

        public List<UrlValue> Urls { get; set; }

        public Image Thumbnail { get; set; }

        public ComicList Comics { get; set; }

        public StoryList Stories { get; set; }

        public EventList Events { get; set; }

        public SeriesList Series { get; set; }
    }
}
