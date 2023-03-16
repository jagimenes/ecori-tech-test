using System.Security.Cryptography;
using System.Text;

namespace EcoriTechTest.Domain.Model.Helpers
{
    public static class CryptographyHelper
    {
        public static string GenerateMD5(string s)
        {
            using var md5 = MD5.Create();
            return BitConverter.ToString(md5.ComputeHash(Encoding.UTF8.GetBytes(s)))
                        .Replace("-", "");
        }
    }
}
