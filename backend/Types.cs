
using System.ComponentModel.DataAnnotations;

namespace WeatherApp
{
  public record LocationInfo()
  {
    public string id { get; init; }
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
    public required string status { get; init; }

    public static WeatherForecastSingle Merge(
      LocationInfo info,
      WeatherForecastResponsePartA partA,
      WeatherForecastResponsePartB partB,
      string status = "success"
    )
    {
      return new WeatherForecastSingle()
      {
        id = info.id,
        city = info.city,
        state = info.state,
        zip = info.zip,
        status = status,
        temperature = partA.temperature,
        windSpeed = partA.windSpeed,
        windDirection = partA.windDirection,
        cloudCoverage = partA.cloudCoverage,
        precipitation = partA.precipitation,
        rolling12MonthTemps = partB.rolling12MonthTemps,
      };
    }

    public static WeatherForecastSingle Failure(LocationInfo info)
    {
      return new WeatherForecastSingle()
      {
        id = info.id,
        city = info.city,
        state = info.state,
        zip = info.zip,
        status = "error",
        temperature = -999,
        windSpeed = -999,
        windDirection = -999,
        cloudCoverage = -999,
        precipitation = [],
        rolling12MonthTemps = [],
      };
    }
  }
}
