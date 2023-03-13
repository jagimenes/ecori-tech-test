using MarvelComicsEcori.Domain.Queries;
using MarvelComicsEcori.Domain.Repositories;
using MarvelComicsEcori.Infra.Repositories;
using MediatR;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

ConfigureService(builder.Services);

ConfigureApp(builder.Build());

void ConfigureApp(WebApplication app)
{
    app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
    if (!app.Environment.IsDevelopment())
    {
        app.UseHsts();
    }
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Marvel Comics API");
    });
    app.UseHttpsRedirection();
    app.UseStaticFiles();
    app.UseRouting();

    app.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");

    app.MapFallbackToFile("index.html");

    app.Run();
}

void ConfigureService(IServiceCollection services)
{
    services.AddHttpClient();
    services.AddScoped<ICharacterRepository, CharacterRepository>();
    services.AddScoped<IComicRepository, ComicRepository>();
    services.AddMediatR(typeof(GetAllCharactersQuery));
    services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "Marvel Comics API", Version = "v1" });
    });
    services.AddControllersWithViews().AddJsonOptions(options => { options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); }); ;
    services.AddEndpointsApiExplorer();
}