using EcoriTechTest.Domain.Model.Settings;

namespace EcoriTechTest.Domain.HttpClients
{
    public class MarvelHttpClient : HttpClient
    {
        public string PublicKey { get; private set; }

        public string PrivateKey { get; private set; }

        public MarvelHttpClient(MarvelProxySettings marvelProxySettings)
        {
            BaseAddress = new Uri(marvelProxySettings?.Url);
            PrivateKey = marvelProxySettings.PrivateKey;
            PublicKey = marvelProxySettings.PublicKey;
        }
    }
}
