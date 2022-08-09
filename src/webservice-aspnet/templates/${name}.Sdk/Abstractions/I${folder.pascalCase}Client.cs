namespace <%= name %>.Sdk.Abstractions
{
    public interface I<%= folder.pascalCase %>Client
    {
        IWeatherForecastApi WeatherForecast { get; }
    }
}
