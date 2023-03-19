using EcoriTechTest.Domain.HttpClients;
using EcoriTechTest.Domain.Model.Settings;
using EcoriTechTest.Domain.Proxies;
using EcoriTechTest.Domain.Services;
using Microsoft.Extensions.DependencyInjection;

namespace EcoriTechTest.Test
{
    [TestClass]
    public class Startup
    {
        [AssemblyInitialize]
        public static void Initialize(TestContext context)
        {
            var serviceCollection = new ServiceCollection();
            var marvelProxySetting = new MarvelProxySettings("http://gateway.marvel.com/v1/public",
                "__PRIVATE_KEY__", "__PUBLIC_KEY__");

            serviceCollection.AddSingleton(marvelProxySetting);
            serviceCollection.AddSingleton(new MarvelHttpClient(marvelProxySetting));
            serviceCollection.AddScoped(typeof(MarvelProxy));
            serviceCollection.AddScoped(typeof(CharacterService));

            Kernel.ServiceProvider = serviceCollection.BuildServiceProvider();
        }

        public static class Kernel
        {
            public static ServiceProvider ServiceProvider { get; set; }
        }
    }
}
