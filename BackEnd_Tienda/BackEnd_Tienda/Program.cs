using BackEnd_Tienda.Models;
using Microsoft.EntityFrameworkCore;

using BackEnd_Tienda.Services.Carga;
using BackEnd_Tienda.Services.Implementacion;
using AutoMapper;
using BackEnd_Tienda.DTO;
using BackEnd_Tienda.Utilidades;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DbsuperMercadoContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("cadenaSQL"));
});

builder.Services.AddScoped<IProductoService, ProductoService>();
builder.Services.AddScoped<ITipoService, TipoService>();

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/tipos/lista", async (
    ITipoService _tipoService,
    IMapper _mapper) =>
{
    var listatipo = await _tipoService.GetList();
    var listatipoDTO = _mapper.Map<List<TipoDTO>>(listatipo);

    if (listatipoDTO.Count > 0) return Results.Ok(listatipoDTO);
    else return Results.NotFound();
});
app.Run();

internal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
