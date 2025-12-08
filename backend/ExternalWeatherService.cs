using System.ComponentModel.DataAnnotations;
using System.Net.Http.Headers;
using System.Text.Json;

namespace WeatherApp
{
  public class ExternalWeatherService
  {
    private readonly HttpClient httpClient;
    private string accessToken = "";

    // Todo: validate security token
    // private JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
    // private bool accessTokenValid {get
    //   {

    //   }
    // }

    public ExternalWeatherService()
    {
      httpClient = new HttpClient();
      httpClient.BaseAddress = new Uri("***REMOVED***WeatherData");
    }


    public async Task RenewAuthentication()
    {
      var ResponseBody = await httpClient.GetFromJsonAsync<AuthenticationResponse>("/Auth/AccessToken");
      if (ResponseBody is null)
      {
        throw new Exception("Cannot get Authentication Token");
      }
      accessToken = ResponseBody.AccessToken;
      httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
    }

    public async Task<WeatherForecastSingle[]> GetWeatherForecasts(GrabWeatherInfoBody requestBody)
    {
      // Todo: Only renew authentication when required.
      await RenewAuthentication();

      requestBody.Validate();


      Task<HttpResponseMessage> responseATask = httpClient.PostAsJsonAsync("/weatherData/ByLocation", requestBody);
      Task<HttpResponseMessage> responseBTask = httpClient.PostAsJsonAsync("/weatherData/ByLocation/HighestTemps", requestBody);

      var responseA = await responseATask;
      var responseB = await responseBTask;

      if (!responseA.IsSuccessStatusCode)
      {
        // Todo: Use ILogger, not Console.Out.WriteLine
        Console.Out.WriteLine(JsonSerializer.Serialize(responseA));

        // Todo: Do not give frontend stack traces.  Return error messages in JSON.
        throw new Exception("External Service doesn't like that input");
      }

      // Console.Out.WriteLine(JsonSerializer.Serialize(responseA));
      responseA.EnsureSuccessStatusCode();
      responseB.EnsureSuccessStatusCode();

      var weatherDataA = await responseA.Content.ReadFromJsonAsync<WeatherForecastResponsePartA[]>();
      var weatherDataB = await responseB.Content.ReadFromJsonAsync<WeatherForecastResponsePartB[]>();
      if (weatherDataA is null || weatherDataB is null)
      {
        // todo: this should never be hit, but if it is, need more details.
        throw new Exception("Received Null Response.");
      }

      // todo: verify that the two sets of Weather Data match up for sure.
      var data = requestBody.locations.Select((location, index) => WeatherForecastSingle.Merge(weatherDataA[index], weatherDataB[index])).ToArray();
      return data;
    }
  }

  record AuthenticationResponse([Required] string AccessToken) { }
}
