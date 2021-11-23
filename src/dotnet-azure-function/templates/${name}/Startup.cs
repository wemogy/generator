using Eve.Core.Abstractions;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Refit;
using System;
using System.IO;
using Wemogy.Core.Configuration;

[assembly: FunctionsStartup(typeof(<%= name %>.Startup))]
namespace <%= name %>
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            // Build Configuration
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddDefaultJsonFiles()
                .AddEnvironmentVariables()
                .Build();            
        }
    }
}
