using BackEnd_Tienda.Models;
using BackEnd_Tienda.Services.Carga;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Tienda.Services.Implementacion
{
    public class ProductoService : IProductoService
    {
        private DbsuperMercadoContext _dbContext;

        public ProductoService(DbsuperMercadoContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Producto> GetId(int idProducto)
        {
            try
            {
                Producto? encontrado = new Producto();
                encontrado = await _dbContext.Productos.Where(e => e.IdProducto == idProducto).FirstOrDefaultAsync();
                return encontrado;
            }catch (Exception ex) { throw ex; }
        }

        public async Task<List<Producto>> GetList()
        {
            try
            {
                List<Producto> list = new List<Producto>();
                list = await _dbContext.Productos.ToListAsync();
                return list;
            }catch(Exception ex) { throw ex; }
        }
        public async Task<Producto> Add(Producto modelo)
        {
            try
            {
                _dbContext.Productos.Add(modelo);
                await _dbContext.SaveChangesAsync();
                return modelo;
            }catch (Exception ex) { throw ex; } 
        }

        public async Task<bool> Delete(Producto modelo)
        {
            try
            {
                _dbContext.Productos.Remove(modelo);
                await _dbContext.SaveChangesAsync();
                return true;
            }catch (Exception ex) { throw ex; }
        }

        public async Task<bool> Update(Producto modelo)
        {
            try
            {
                _dbContext.Productos.Update(modelo);
                await _dbContext.SaveChangesAsync();
                return true;
            }catch (Exception ex) { throw ex; }
        }
    }
}
