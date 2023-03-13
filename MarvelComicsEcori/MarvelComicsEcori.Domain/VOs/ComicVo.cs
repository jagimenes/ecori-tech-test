namespace MarvelComicsEcori.Domain.VOs
{
    public class ComicVo
    {
        public ComicVo(int available, int returned, string collectionURI)
        {
            Available = available;
            Returned = returned;
            CollectionURI = collectionURI;
            Items = new List<ComicSummaryVo>();
        }

        public int Available { get; private set; }
        public int Returned { get; private set; }
        public string CollectionURI { get; private set; }
        public List<ComicSummaryVo> Items { get; private set; }
    }
}