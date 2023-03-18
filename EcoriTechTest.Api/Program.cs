using EcoriTechTest.Domain.HttpClients;
using EcoriTechTest.Domain.Model.Settings;
using EcoriTechTest.Domain.Proxies;
using EcoriTechTest.Domain.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var marvelProxySettings = builder.Configuration.GetSection("MarvelProxySettings").Get<MarvelProxySettings>();
builder.Services.AddSingleton(marvelProxySettings);
builder.Services.AddSingleton(new MarvelHttpClient(marvelProxySettings));
builder.Services.AddScoped(typeof(MarvelProxy));
builder.Services.AddScoped(typeof(CharacterService));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(x=> x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseAuthorization();

app.MapControllers();

app.Run();
