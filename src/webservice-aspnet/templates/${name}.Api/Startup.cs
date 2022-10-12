using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using <%= name %>.Core;
using Wemogy.AspNetCore.Configuration;
<% if (wemogyIdentity) { %>using Wemogy.Identity.AspNetCore;<% } %>

namespace <%= name %>.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDefaultSetup();

            services.Add<%= folder.pascalCase %>();
<% if (wemogyIdentity) { %>
            // Add Wemogy Authentication
            services.AddWemogyIdentity(options =>
            {
                options.OAuthJwtAuthority = Configuration["OAuthJwtAuthority"];
                options.OAuthJwtAudience = Configuration["OAuthJwtAudience"];
            });
<% } %>
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseDefaultSetup(Configuration, env);
<% if (wemogyIdentity) { %>
            app.UseAuthentication();
<% } %>
        }
    }
}
