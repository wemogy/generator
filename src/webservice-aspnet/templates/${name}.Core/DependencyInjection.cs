using Microsoft.Extensions.DependencyInjection;

namespace <%= name %>.Core
{
    public static class DependencyInjection
    {
        /// <summary>
        /// IContext is expected to be part of the serviceCollection
        /// </summary>
        public static void Add<%= folder.pascalCase %>(this IServiceCollection services)
        {
            // Data Stores
            // ...

            // Services
            // ...
            // services.AddScoped<...>();
        }
    }
}
