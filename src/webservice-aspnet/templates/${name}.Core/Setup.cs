using Microsoft.Extensions.DependencyInjection;

namespace <%= name %>.Core
{
    public static class Setup
    {
        /// <summary>
        /// IContext is expected to be part of the serviceCollection
        /// </summary>
        public static void Add<%= folder.camelCase %>(this IServiceCollection services)
        {
            // Data Stores
            // ...

            // Services
            // ...
            // services.AddScoped<...>();
        }
    }
}
