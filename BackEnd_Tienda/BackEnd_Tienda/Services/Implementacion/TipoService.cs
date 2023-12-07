using Microsoft.EntityFrameworkCore;
using BackEnd_Tienda.Models;
using BackEnd_Tienda.Services.Carga;
using Microsoft.IdentityModel.Abstractions;
using System.Linq.Expressions;

namespace BackEnd_Tienda.Services.Implementacion
{
    public class TipoService : ITipoService
    {

        private DbsuperMercadoContext _dbContext;

        public TipoService(DbsuperMercadoContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Tipo> GetId(int idTipo)
        {
            try
            {
                Tipo encontrado = new Tipo();
                encontrado = await _dbContext.Tipos.Where(e => e.IdTipo == idTipo).FirstOrDefaultAsync();
                return encontrado;
            }catch (Exception ex) { throw ex; }
        }
        public async Task<List<Tipo>> GetList()
        {
            try
            {
                List<Tipo> lista = new List<Tipo>();
                lista = await _dbContext.Tipos.ToListAsync();
                return lista;
            }
            catch (Exception ex) { throw ex; }
        }

        public async Task<Tipo> Add(Tipo modelo)
        {
            try 
            {
                _dbContext.Tipos.Add(modelo);
                await _dbContext.SaveChangesAsync();
                return modelo;
            } catch(Exception ex) { throw ex; }
        }
        public async Task<bool> Update(Tipo modelo)
        {
            try
            {
                _dbContext.Tipos.Update(modelo);
                await _dbContext.SaveChangesAsync();
                return true;
            }catch (Exception ex) { throw ex; }
        }

        public async Task<bool> Delete(Tipo modelo)
        {
            try {
                _dbContext.Tipos.Remove(modelo);
                await _dbContext.SaveChangesAsync();
                return true;
            }catch(Exception ex) { throw ex; }  
        }
    }
}
