using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
<% if (wemogyIdentity) { %>using Wemogy.Identity.AspNetCore;<% } %>

namespace <%= name %>
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
            services.AddControllers();
<% if (wemogyIdentity) { %>
            // Add Wemogy Authentication
            services.AddWemogyIdentity(options =>
            {
                options.OAuthJwtAuthority = Configuration["OAuthJwtAuthority"];
                options.OAuthJwtAudience = Configuration["OAuthJwtAudience"];
            });
<% } %>
<% if (authorization) { %>
            // Add Swagger
            var xmlDocsFilePath = Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.xml");
            services.AddSwagger("1.0", "<%= name %> API", "1.0", "This is the <%= name %> API.", xmlDocsFilePath, "Bearer", new OpenApiSecurityScheme
            {
                Description = Strings.ApiAuthenticationDescription,
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey
            });
<% } else { %>
            // Add Swagger
            var xmlDocsFilePath = Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.xml");
            services.AddSwagger("1.0", "<%= name %> API", "1.0", "This is the <%= name %> API.", xmlDocsFilePath);
<% } %>
            // Add Logging
            services.AddApplicationInsightsTelemetry(Configuration["AzureApplicationInsightsInstrumentationKey"]);
            services.AddSingleton<ITelemetryInitializer>(new CloudRoleNameTelemetryInitializer(Configuration["AzureApplicationInsightsCloudRole"]));

            // CORS
            services.AddCors(options => options.AddPolicy("CorsPolicy", builder =>
            {
                builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));

            // Enforce lowercase routes
            services.AddRouting(options => options.LowercaseUrls = true);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                TelemetryDebugWriter.IsTracingDisabled = true;
            }

            app.UseCors("CorsPolicy");
<% if (wemogyIdentity) { %>
            app.UseAuthentication();
<% } %>
            // Use Swagger
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.DocumentTitle = "<%= name %> API";
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
                c.RoutePrefix = string.Empty;
            });

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
