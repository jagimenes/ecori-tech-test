using EcoriTechTest.Domain.Model.ValueObjects;

namespace EcoriTechTest.Domain.Model.Entities
{
    public class Character
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime Modified { get; set; }

        public string ResourceURI { get; set; }

        public List<UrlValue> Urls { get; set; }

        public Image Thumbnail { get; set; }

        public List<ComicList> Comics { get; set; }

        public List<StoryList> Stories { get; set; }

        public List<EventList> Events { get; set; }

        public List<SeriesList> Series { get; set; }
    }
}
