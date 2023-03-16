namespace EcoriTechTest.Domain.Model.Dtos
{
    public class DataError
    {
        public string Code { get; set; }

        public string Message { get; set; }

        public override string ToString()
        {
            return $"{Code} - {Message}";
        }
    }
}
