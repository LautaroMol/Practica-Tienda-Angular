import { Component,OnInit  } from '@angular/core';
import { Producto } from '../interfaces/producto';
import {MatRadioModule} from '@angular/material/radio'; 
import { Tipo } from '../interfaces/tipo';
import { ProductoService } from '../Services/producto.service';
import { TipoService } from '../Services/tipo.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion'; 

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [MatRadioModule,FormsModule,MatFormFieldModule,MatIconModule,CommonModule,MatInputModule,MatGridListModule,MatListModule,MatCardModule
    ,MatButtonModule,MatExpansionModule],
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.css'
})
export class VentaComponent implements OnInit {

  constructor(
    private _tipoServicio: TipoService,
    private _productoServicio: ProductoService,){}
    listaProductos: Producto[] = [];
    listaCategorias: Tipo[] = [];
    carrito: Producto[] = [];
    selectedCategory: number | null = null;
    filteredProducts: Producto[] = [];

  
  ngOnInit() {
    this.mostrarProductos();
    this.mostrarCategorias();
  }

  agregarAlCarrito(producto: Producto) {
    const productoExistente = this.carrito.find(p => p.idProducto === producto.idProducto);

  if (productoExistente) {
    productoExistente.ventas += producto.ventas;
  } else {
    const productoClonado = { ...producto };
    this.carrito.push(productoClonado);
    }
  }

  carritoVisible: boolean = false;
  toggleCarrito() {
    this.carritoVisible = !this.carritoVisible;
  }

  mostrarProductos() {
    this._productoServicio.getList().subscribe({
      next: (data) => {
        this.listaProductos = data;
        console.log(this.listaProductos);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  mostrarCategorias() {
    this._tipoServicio.getList().subscribe({
      next: (data) => {
        this.listaCategorias = data;
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  filtrarProductosPorCategoria() {
    this.filteredProducts = this.listaProductos.filter(producto => {
      return this.selectedCategory ? producto.codTipo === this.selectedCategory : true;
    });
  }
}

