namespace MarvelComicsEcori.Domain.VOs;

public class SeriesVo
{
    public int Available { get; private set; }
    public int Returned { get; private set; }
    public string ColectionURL { get; private set; }
    public List<SeriesSummaryVo> Items { get; private set; }
}