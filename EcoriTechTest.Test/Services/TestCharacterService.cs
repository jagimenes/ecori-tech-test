using EcoriTechTest.Domain.Services;
using Microsoft.Extensions.DependencyInjection;
using static EcoriTechTest.Test.Startup;

namespace EcoriTechTest.Test.Services
{
    [TestClass]
    public class TestCharacterService
    {
        private static CharacterService _service;

        [ClassInitialize]
        public static void Setup(TestContext _)
        {
            _service = Kernel.ServiceProvider.GetService<CharacterService>();
        }

        [TestMethod]
        public async Task Test_Get_Characters_Without_Filter()
        {
            try
            {
                var container = await _service.Get();
                Assert.IsTrue(container?.Results?.Any() ?? false);
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
                var origin = await _service.Get();
                var characterBase = origin?.Results?.FirstOrDefault() ?? null;
                if (characterBase == null)
                    Assert.Fail("CharacterBase not found.");

                var container = await _service.Get($"name={characterBase.Name}");
                Assert.IsTrue(container?.Results?.Any() ?? false);
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
                var origin = await _service.Get();
                var characterBase = origin?.Results?.FirstOrDefault() ?? null;
                if (characterBase == null)
                    Assert.Fail("CharacterBase not found.");

                var result = await _service.Get(characterBase.Id);
                Assert.IsTrue(result?.Id != null);
            }
            catch (Exception ex)
            {
                Assert.Fail(ex.Message);
            }
        }
    }
}
