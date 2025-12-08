
using System.ComponentModel.DataAnnotations;

public record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
  public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

public record LocationInfo
{

  public required string city;
  public required string state;
  public required string zip;
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

public record Percipitation
{
  public required string type;
  public required string probability;
}

public record WeatherForecastResponsePartA : LocationInfo
{
  public required float temperature;
  public required float windSpeed;
  public required float windDirection;
  public required float cloudCoverage;
  public required Percipitation[] percipitation;
}

public record WeatherForecastResponsePartB : LocationInfo
{
  public required float[] rolling12MonthTemps;
}

public record WeatherForecastSingle(WeatherForecastResponsePartA partA, WeatherForecastResponsePartB partB)
{

}