using AutoMapper;
using BackEnd_Tienda.DTO;
using BackEnd_Tienda.Models;
using System.Globalization;

namespace BackEnd_Tienda.Utilidades
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            #region Producto

            CreateMap<Producto, ProductoDTO>().
                ForMember(destino => destino.Categoria, opt => opt.MapFrom(origen => origen.CodTipoNavigation.Nombre))
                .ForMember(destino => destino.CategoriaDescrip, opt => opt.MapFrom(origen => origen.Descripcion));

            CreateMap<ProductoDTO, Producto>()
                .ForMember(destino => destino.CodTipoNavigation, opt => opt.Ignore()
                );
            #endregion

            #region Tipo
            CreateMap<Tipo, TipoDTO>().ReverseMap();
            #endregion
        }
    }
}
