using System;
using System.Threading.Tasks;
using Refit;

namespace <%= name %>.Sdk.Abstractions
{
    public interface IWeatherForecastApi
    {
        [Get("/weatherforecast")]
        Task GetAsync();
    }
}
