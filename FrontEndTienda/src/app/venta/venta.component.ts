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

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [MatRadioModule,FormsModule,MatFormFieldModule,MatIconModule,CommonModule,MatInputModule,MatGridListModule,MatListModule,MatCardModule
    ,MatButtonModule],
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.css'
})
export class VentaComponent implements OnInit {

  constructor(
    private _tipoServicio: TipoService,
    private _productoServicio: ProductoService,){}
    listaProductos: Producto[] = [];
    listaCategorias: Tipo[] = [];
    carrito: { producto: Producto; cantidad: number }[] = [];
    selectedCategory: number | null = null;
    filteredProducts: Producto[] = [];
    cantidad: number = 0;

  
  ngOnInit() {
    this.mostrarProductos();
    this.mostrarCategorias();
    console.log(this.listaProductos);
    this._productoServicio.getList().subscribe({
      next: (data) => {
        this.listaProductos = data;
        console.log(this.listaProductos);
      },
      error: (e) => {
        console.error(e);
      },
    });
    console.log(this.listaProductos);
  }

  agregarAlCarrito(producto: Producto, cantidad: number) {
  let cantidadSeleccionada = cantidad;

  if (cantidadSeleccionada <= producto.stock) {
    const itemEnCarrito = this.carrito.find(item => item.producto.idProducto === producto.idProducto);

    if (itemEnCarrito) {
      itemEnCarrito.cantidad += cantidadSeleccionada;
    } else {
      this.carrito.push({ producto, cantidad: cantidadSeleccionada });
    }

    producto.stock -= cantidadSeleccionada;

    cantidadSeleccionada = 1
  } else {
    console.error('Cantidad seleccionada excede el stock disponible');
    }
  }

  incrementQuantity(): void {
    this.cantidad++;
  }

  decrementQuantity(): void {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
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

