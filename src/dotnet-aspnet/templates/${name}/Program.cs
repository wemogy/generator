using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Wemogy.Core.Configuration;
<% if (dapr) { %>using Dapr.Client;<% } %>

namespace <%= name %>
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration(config =>
                {
<% if (dapr) { %>
                    var daprClient = new DaprClientBuilder().Build();
                    config
                        .SetBasePath(Directory.GetCurrentDirectory())
                        .AddDefaultJsonFiles()
                        .AddDaprSecretStore(daprClient, "secret-store")
                        .AddEnvironmentVariables();
<% } else { %>
                    config
                        .SetBasePath(Directory.GetCurrentDirectory())
                        .AddDefaultJsonFiles()
                        .AddEnvironmentVariables();
<% } %>
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}