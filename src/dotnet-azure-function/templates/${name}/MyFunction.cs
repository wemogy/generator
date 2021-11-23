using Eve.Core.Abstractions;
using Eve.Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using PuppeteerSharp;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace <%= name %>
{
    public class MyFunction
    {
        [FunctionName("MyFunction")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "greet/{name}")] HttpRequest req, string name,
            ILogger log)
        {        
            return new OkObjectResult($"Hello {name}");
        }
    }
}
