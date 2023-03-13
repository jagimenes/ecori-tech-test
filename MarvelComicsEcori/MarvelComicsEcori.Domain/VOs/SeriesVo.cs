namespace MarvelComicsEcori.Domain.VOs;

public class SeriesVo
{
    public SeriesVo(int available, int returned, string collectionURI)
    {
        Available = available;
        Returned = returned;
        CollectionURI = collectionURI;
        Items = new List<SeriesSummaryVo>();
    }

    public int Available { get; private set; }
    public int Returned { get; private set; }
    public string CollectionURI { get; private set; }
    public List<SeriesSummaryVo> Items { get; private set; }
}