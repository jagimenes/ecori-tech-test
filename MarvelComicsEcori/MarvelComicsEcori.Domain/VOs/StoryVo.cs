namespace MarvelComicsEcori.Domain.VOs;

public class StoryVo
{
    public int Available { get; private set; }
    public int Returned { get; private set; }
    public string ColectionURL { get; private set; }
    public List<StorySummaryVo> Items { get; private set; }
}