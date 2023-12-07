using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Tienda.Models;

public partial class DbsuperMercadoContext : DbContext
{
    public DbsuperMercadoContext()
    {
    }

    public DbsuperMercadoContext(DbContextOptions<DbsuperMercadoContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Tipo> Tipos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.IdProducto).HasName("PK__Producto__0988921043180335");

            entity.ToTable("Producto");

            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.CodTipoNavigation).WithMany(p => p.Productos)
                .HasForeignKey(d => d.CodTipo)
                .HasConstraintName("FK__Producto__CodTip__3C69FB99");
        });

        modelBuilder.Entity<Tipo>(entity =>
        {
            entity.HasKey(e => e.IdTipo).HasName("PK__Tipo__9E3A29A5F8D76B4C");

            entity.ToTable("Tipo");

            entity.Property(e => e.Descripcion)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
