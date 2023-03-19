namespace EcoriTechTest.Domain.Model.Dtos
{
    public class DataWrapper<T>
    {
        public int Code { get; set; }

        public string Status { get; set; }

        public string Copyright { get; set; }

        public string AttributionText { get; set; }

        public string AttributionHTML { get; set; }

        public DataContainer<T> Data { get; set; }

        public string Etag { get; set; }
    }
}
