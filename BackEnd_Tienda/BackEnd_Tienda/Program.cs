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

builder.Services.AddCors(opciones =>
{
    opciones.AddPolicy("politicaNueva", app =>
    {
        app.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});
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
#region peticiones

app.MapGet("tipo/lista", async (
    ITipoService _tipoService,
    IMapper _mapper) =>
{
    var listatipo = await _tipoService.GetList();
    var listatipoDTO = _mapper.Map<List<TipoDTO>>(listatipo);

    if (listatipoDTO.Count > 0) return Results.Ok(listatipoDTO);
    else return Results.NotFound();
});

app.MapGet("producto/lista", async (
    IProductoService _productoServicio,
    IMapper _mapper) =>
{
    var listaproducto = await _productoServicio.GetList();
    var listaproductoDTO = _mapper.Map<List<ProductoDTO>>(listaproducto);

    if (listaproductoDTO.Count > 0) return Results.Ok(listaproductoDTO);
    else return Results.NotFound();
});

app.MapPost("tipo/guardar", async (
    TipoDTO tipoDTO,
    ITipoService _tipoService,
    IMapper _mapper) => {
        var _tipo = _mapper.Map<Tipo>(tipoDTO);
        var _tipoCreado = await _tipoService.Add(_tipo);

        if (_tipoCreado.IdTipo != 0) return Results.Ok(_mapper.Map<TipoDTO>(_tipoCreado));
        else return Results.StatusCode(StatusCodes.Status500InternalServerError);
    });

app.MapPut("tipo/actualizar/{idTipo}", async (
    TipoDTO tipoDTO,
    ITipoService _tipoService,
    IMapper _mapper,
    int idTipo) =>{
        var encontrado = await _tipoService.GetId(idTipo);
        if (encontrado is null) return Results.NotFound();
        var tipo = _mapper.Map<Tipo>(tipoDTO);
        encontrado.CodTipo = tipoDTO.CodTipo;
        encontrado.Descripcion = tipo.Descripcion;
        encontrado.Nombre = tipo.Nombre;

        var resp = await _tipoService.Update(encontrado);

        if(resp) return Results.Ok(_mapper.Map<TipoDTO>(encontrado));
        else return Results.StatusCode(StatusCodes.Status500InternalServerError);
    });
app.MapDelete("tipo/borrar/{idTipo}", async (
    ITipoService _tipoService,
    int idTipo) => {
        var encontrado = await _tipoService.GetId(idTipo);
        if (encontrado is null) return Results.NotFound();

        var resp = await _tipoService.Delete(encontrado);
        if (resp) return Results.Ok();
        else return Results.StatusCode(StatusCodes.Status500InternalServerError);
    });
app.MapPost("producto/guardar", async (
    ProductoDTO productoDTO,
    IProductoService _productoServicio,
    IMapper _mapper) => {
        var producto = _mapper.Map<Producto>(productoDTO);
        var productoCreado = await _productoServicio.Add(producto);

        if (productoCreado.IdProducto != 0) return Results.Ok(_mapper.Map<ProductoDTO>(productoCreado));
        else return Results.StatusCode(StatusCodes.Status500InternalServerError);
    });
app.MapPut("producto/actualizar/{idProducto}", async (
    ProductoDTO productoDTO,
    IProductoService _productoServicio,
    IMapper _mapper,
    int idProducto) => {
        var encontrado = await _productoServicio.GetId(idProducto);
        if (encontrado is null) return Results.NotFound();

        var tipo = _mapper.Map<Producto>(productoDTO);
        encontrado.Nombre = productoDTO.Nombre;
        encontrado.Precio = productoDTO.Precio;
        encontrado.Stock = productoDTO.Stock;
        encontrado.Descripcion = productoDTO.Descripcion;
        encontrado.Ventas = productoDTO.Ventas;

        var resp = await _productoServicio.Update(encontrado);
        if (resp) return Results.Ok(_mapper.Map<ProductoDTO>(encontrado));
        else return Results.StatusCode(StatusCodes.Status500InternalServerError);
    });
app.MapDelete("producto/borrar/{idProducto}", async (
    IProductoService productoServicio,
    int idProducto) => 
    {
        var encontrado = await productoServicio.GetId(idProducto);
        if (encontrado is null) return Results.NotFound();

        var resp = await productoServicio.Delete(encontrado);
        if (resp) return Results.Ok();
        else return Results.StatusCode(StatusCodes.Status500InternalServerError);
    });

#endregion
app.UseCors("politicaNueva");

app.Run();

internal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
