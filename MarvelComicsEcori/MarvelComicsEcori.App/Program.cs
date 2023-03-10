using MarvelComicsEcori.Domain.Queries;
using MarvelComicsEcori.Domain.Repositories;
using MarvelComicsEcori.Infra.Repositories;
using MediatR;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

ConfigureService(builder.Services);

ConfigureApp(builder.Build());

void ConfigureApp(WebApplication app)
{
    if (!app.Environment.IsDevelopment())
    {
        app.UseHsts();
    }
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
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
    services.AddScoped<ICharacterRepository, CharacterRepository>();
    services.AddMediatR(typeof(GetAllCharactersQuery));
    services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
    });
    services.AddControllersWithViews();
    services.AddEndpointsApiExplorer();
}