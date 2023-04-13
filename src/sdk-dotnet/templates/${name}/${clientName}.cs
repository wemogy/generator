using System;
using SpaceBlocks.Libs.Sdk.Models;
using <%= name %>.Api;
using <%= name %>.Client;

namespace <%= name %>
{
    public class <%= clientName %>
    {
        public <%= clientName %>(
            Uri basePath,
            string apiKey,
            AuthenticationOptions authenticationOptions,
            Uri? authUrl = null)
        {
            authUrl ??= new Uri("https://auth.spaceblocks.cloud");
            var configuration = new Configuration();
            var apiClient = new ApiClient(basePath, authUrl, authenticationOptions);
        }
    }
}
