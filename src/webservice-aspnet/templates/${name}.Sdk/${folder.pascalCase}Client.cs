using System;
using Refit;
using Wemogy.Core.Refit;
using Wemogy.Core.Refit.SetupEnvironments;
using <%= name %>.Sdk.Abstractions;

namespace <%= name %>.Sdk
{
    public class <%= folder.pascalCase %>Client : I<%= folder.pascalCase %>Client
    {
        public IWeatherForecastApi WeatherForecast { get; }

        public <%= folder.pascalCase %>Client(Uri uri)
        {
            var refit = new RefitEnvironment(uri);
            WeatherForecast = refit.GetApi<IWeatherForecastApi>();
        }
    }
}
