namespace MarvelComicsEcori.Domain.VOs
{
    public class SeriesSummaryVo
    {
        public SeriesSummaryVo(string resourceURI, string name)
        {
            ResourceURI = resourceURI;
            Name = name;
        }

        public string ResourceURI { get; private set; }
        public string Name { get; private set; }
    }
}