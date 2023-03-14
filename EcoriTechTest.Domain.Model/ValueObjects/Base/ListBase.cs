namespace EcoriTechTest.Domain.Model.ValueObjects.Base
{
    public class ListBase<TSummary> where TSummary : SummaryBase
    {
        public int Available { get; set; }

        public int Returned { get; set; }

        public string CollectionURI { get; set; }

        public List<TSummary> Items { get; set; }
    }
}
