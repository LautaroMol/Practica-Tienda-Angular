using BackEnd_Tienda.Models;
using BackEnd_Tienda.Services.Carga;

namespace BackEnd_Tienda.Services.Implementacion
{
    public class ProductoService : IProductoService
    {
        private DbsuperMercadoContext _dbContext;

        public ProductoService(DbsuperMercadoContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<Producto> Add(Producto modelo)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(Producto modelo)
        {
            throw new NotImplementedException();
        }

        public Task<Producto> GetId(int idProducto)
        {
            throw new NotImplementedException();
        }

        public Task<List<Producto>> GetList()
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(Producto modelo)
        {
            throw new NotImplementedException();
        }
    }
}
