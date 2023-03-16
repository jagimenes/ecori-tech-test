using EcoriTechTest.Domain.Model.Entities;
using EcoriTechTest.Domain.Proxies;
using Microsoft.Extensions.DependencyInjection;
using static EcoriTechTest.Test.Startup;

namespace EcoriTechTest.Test.Proxies
{
    [TestClass]
    public class TestMarvelProxy
    {
        private static MarvelProxy _proxy;

        [ClassInitialize]
        public static void Setup(TestContext _)
        {
            _proxy = Kernel.ServiceProvider.GetService<MarvelProxy>();
        }

        [TestMethod]
        public async Task Test_Get_Characters_Without_Filter()
        {
            try
            {
                var result = await _proxy.Get<Character>();
                Assert.IsTrue(result?.Data?.Results?.Any() ?? false);
            }
            catch (Exception ex)
            {
                Assert.Fail(ex.Message);
            }
        }

        [TestMethod]
        public async Task Test_Get_Characters_With_Filter()
        {
            try
            {
                var origin = await _proxy.Get<Character>();
                var characterBase = origin?.Data?.Results?.FirstOrDefault() ?? null;
                if (characterBase == null)
                    Assert.Fail("CharacterBase not found.");

                var result = await _proxy.Get<Character>($"name={characterBase.Name}");
                Assert.IsTrue(result?.Data?.Results?.Any() ?? false);
            }
            catch (Exception ex)
            {
                Assert.Fail(ex.Message);
            }
        }

        [TestMethod]
        public async Task Test_Get_Character_By_Id()
        {
            try
            {
                var origin = await _proxy.Get<Character>();
                var characterBase = origin?.Data?.Results?.FirstOrDefault() ?? null;
                if (characterBase == null)
                    Assert.Fail("CharacterBase not found.");

                var result = await _proxy.Get<Character>(characterBase.Id);
                Assert.IsTrue(result?.Data?.Results?.Any() ?? false);
            }
            catch (Exception ex)
            {
                Assert.Fail(ex.Message);
            }
        }
    }
}
