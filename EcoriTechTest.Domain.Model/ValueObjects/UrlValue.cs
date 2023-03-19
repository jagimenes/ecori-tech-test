namespace EcoriTechTest.Domain.Model.ValueObjects
{
    public class UrlValue
    {
        /// <summary>
        /// A text identifier for the URL.
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// A full URL (including scheme, domain, and path).
        /// </summary>
        public string Url { get; set; }
    }
}
