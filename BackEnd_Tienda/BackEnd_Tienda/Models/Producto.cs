using System;
using System.Collections.Generic;

namespace BackEnd_Tienda.Models;

public partial class Producto
{
    public int IdProducto { get; set; }

    public string? Nombre { get; set; }

    public int? Precio { get; set; }

    public int? Stock { get; set; }

    public string? Descripcion { get; set; }

    public int? Ventas { get; set; }

    public int? CodTipo { get; set; }

    public virtual Tipo? CodTipoNavigation { get; set; }
}
