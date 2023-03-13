namespace MarvelComicsEcori.Domain.VOs;

public class StoryVo
{
    public StoryVo(int available, int returned, string collectionURI)
    {
        Available = available;
        Returned = returned;
        CollectionURI = collectionURI;
        Items = new List<StorySummaryVo>();
    }

    public int Available { get; private set; }
    public int Returned { get; private set; }
    public string CollectionURI { get; private set; }
    public List<StorySummaryVo> Items { get; private set; }
}