using System;
using System.Collections.Generic;

namespace BackEnd_Tienda.Models;

public partial class Tipo
{
    public int IdTipo { get; set; }

    public int? CodTipo { get; set; }

    public string? Nombre { get; set; }

    public string? Descripcion { get; set; }

    public virtual ICollection<Producto>? Productos { get; set; } = new List<Producto>();
}
