using BackEnd_Tienda.Models;

namespace BackEnd_Tienda.DTO
{
    public class ProductoDTO
    {
        public string? Nombre { get; set; }

        public int? Precio { get; set; }

        public int? Stock { get; set; }

        public string? Descripcion { get; set; }

        public int? Ventas { get; set; }
        public int CodTipo { get; set; }
        public string Categoria { get; set; }
        public string CategoriaDescrip { get; set; }

    }
}
