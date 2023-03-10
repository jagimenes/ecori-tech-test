namespace MarvelComicsEcori.Domain.VOs
{
    public class ComicVo
    {
        public int Available { get; private set; }
        public int Returned { get; private set; }
        public string ColectionURL { get; private set; }
        public List<ComicSummaryVo> Items { get; private set; }
    }
}