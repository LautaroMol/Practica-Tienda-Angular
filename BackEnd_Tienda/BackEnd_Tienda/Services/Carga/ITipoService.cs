using BackEnd_Tienda.Models;

namespace BackEnd_Tienda.Services.Carga
{
    public interface ITipoService
    {
        Task<List<Tipo>> GetList();
        Task<Tipo> GetId(int idTipo);
        Task<Tipo> Add(Tipo modelo);
        Task<bool> Update(Tipo modelo);
        Task<bool> Delete(Tipo modelo);
    }
}
