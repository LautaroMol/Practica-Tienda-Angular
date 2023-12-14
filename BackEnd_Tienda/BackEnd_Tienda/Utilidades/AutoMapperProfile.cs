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
            #region Tipo
            CreateMap<Tipo, TipoDTO>().ReverseMap();
            #endregion


            #region Producto

            CreateMap<Producto, ProductoDTO>()
                .ForMember(destino => destino.CodTipo, opt => opt.MapFrom(origen => origen.CodTipoNavigation.CodTipo))
                .ForMember(destino => destino.Categoria, opt => opt.MapFrom(origen => origen.CodTipoNavigation.Nombre))
                .ForMember(destino => destino.CategoriaDescrip, opt => opt.MapFrom(origen => origen.CodTipoNavigation.Descripcion));

            CreateMap<ProductoDTO, Producto>()
                .ForMember(destino => destino.CodTipoNavigation, opt => opt.Ignore()
                );
            #endregion
        }
    }
}
