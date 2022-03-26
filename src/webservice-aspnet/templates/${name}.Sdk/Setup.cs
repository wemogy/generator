using System;
using Microsoft.Extensions.DependencyInjection;
using Wemogy.Core.Logging;
using Wemogy.Core.Refit;
using <%= name %>.Sdk.Abstractions;

namespace <%= name %>.Sdk
{
    public static class Setup
    {
        public static IServiceCollection Add<%= folder.pascalCase %>(this IServiceCollection services, Uri uri)
        {
            services.AddSingleton<I<%= folder.pascalCase %>Client>(new <%= folder.pascalCase %>Client(uri));
            return services;
        }
    }
}
