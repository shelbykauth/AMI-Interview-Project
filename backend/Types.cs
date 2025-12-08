
using System.ComponentModel.DataAnnotations;

namespace WeatherApp
{
  public record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
  {
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
  }

  public record LocationInfo()
  {
    public required string city { get; init; }
    public required string state { get; init; }
    public required string zip { get; init; }
  }

  public record GrabWeatherInfoBody([Required] LocationInfo[] locations, string unitofMeasurement = "F")
  {
    public void Validate()
    {
      string[] validUnits = ["F", "C"];
      if (validUnits.First((val) => val == unitofMeasurement) is null)
      {
        throw new Exception("unitofMeasurement must be 'F' or 'C'.  Found" + unitofMeasurement);
      }
    }
  }

  public record Precipitation
  {
    public required string type { get; init; }
    public required float probability { get; init; }
  }

  public record WeatherForecastResponsePartA : LocationInfo
  {
    public required float temperature { get; init; }
    public required float windSpeed { get; init; }
    public required float windDirection { get; init; }
    public required float cloudCoverage { get; init; }
    public required Precipitation[] precipitation { get; init; }
  }

  public record WeatherForecastResponsePartB : LocationInfo
  {
    public required float[] rolling12MonthTemps { get; init; }
  }

  public record WeatherForecastSingle : WeatherForecastResponsePartA
  {
    public required float[] rolling12MonthTemps { get; init; }

    public static WeatherForecastSingle Merge(
      WeatherForecastResponsePartA partA,
      WeatherForecastResponsePartB partB
    )
    {
      return new WeatherForecastSingle()
      {
        city = partA.city,
        state = partA.state,
        zip = partA.zip,
        temperature = partA.temperature,
        windSpeed = partA.windSpeed,
        windDirection = partA.windDirection,
        cloudCoverage = partA.cloudCoverage,
        precipitation = partA.precipitation,
        rolling12MonthTemps = partB.rolling12MonthTemps,
      };
    }
  }
}