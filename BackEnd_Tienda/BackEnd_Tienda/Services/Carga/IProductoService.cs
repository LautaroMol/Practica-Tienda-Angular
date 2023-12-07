using BackEnd_Tienda.Models;


namespace BackEnd_Tienda.Services.Carga
{
    public interface IProductoService
    {
        Task<List<Producto>> GetList();
        Task<Producto> GetId(int idProducto);
        Task<Producto> Add(Producto modelo);
        Task<bool> Update(Producto modelo);
        Task<bool> Delete(Producto modelo);
    }
}
