using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

using WeatherApp;

const string CORS_ALLOW_ANY = "CORS_ALLOW_ANY";

var builder = WebApplication.CreateBuilder(args);
IHostEnvironment env = builder.Environment;

var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true, true)
    .AddUserSecrets<Program>()
    .Build();

ExternalWeatherService externalWeatherService = new ExternalWeatherService(configuration);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    // Non-policy.  It's not best practice, but for now, this needs to be accessible regardless of the machine name.
    // Later on, I would add a configuration variable for allowing specific frontends.
    options.AddPolicy(name: CORS_ALLOW_ANY, policy =>
    {
        policy.AllowAnyOrigin();
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
});
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.WriteIndented = true;
    options.SerializerOptions.IncludeFields = true;
});

// // This isn't working.
// // Todo: add Rate Limiting
// builder.Services.AddRateLimiter(options =>
// {
//     options.AddFixedWindowLimiter("fixed", opt =>
//     {
//         opt.PermitLimit = 4;
//         opt.Window = TimeSpan.FromSeconds(12);
//         opt.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
//         opt.QueueLimit = 2;
//     });
// });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(CORS_ALLOW_ANY);
}

// app.UseHttpsRedirection();

app.MapPost("/weatherforecast", async ([FromBody] GrabWeatherInfoBody body) =>
{
    return await externalWeatherService.GetWeatherForecasts(body);
})
.WithName("PostWeatherForecast")
.WithOpenApi();

app.Run();
