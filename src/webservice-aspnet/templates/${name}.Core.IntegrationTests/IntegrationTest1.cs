using System;
using Microsoft.Extensions.DependencyInjection;
using Wemogy.Configuration;
using Xunit;

namespace <%= name %>.Core.IntegrationTests
{
    public class IntegrationTest1
    {
        public IntegrationTest1()
        {
            var configuration = ConfigurationFactory.BuildConfiguration();
            var serviceCollection = new ServiceCollection();
            serviceCollection.Add<%= folder.camelCase %>();

            // Access the Secret with configuration["Secret]
        }

        [Fact]
        public void Test1()
        {
        }
    }
}
