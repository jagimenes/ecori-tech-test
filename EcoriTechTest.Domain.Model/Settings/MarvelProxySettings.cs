namespace EcoriTechTest.Domain.Model.Settings
{
    public class MarvelProxySettings
    {
        public MarvelProxySettings()
        {

        }

        public MarvelProxySettings(string url, string privateKey, string publicKey) : this()
        {
            Url = url;
            PrivateKey = privateKey;
            PublicKey = publicKey;
        }

        public string Url { get; set; }

        public string PublicKey { get; set; }

        public string PrivateKey { get; set; }
    }
}
