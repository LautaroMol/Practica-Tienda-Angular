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
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

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
    private _productoServicio: ProductoService,
    private _snackBar: MatSnackBar,
    private appComponent: AppComponent,
    private router: Router,
    ){}
    listaProductos: Producto[] = [];
    listaCategorias: Tipo[] = [];
    carrito: Producto[] = [];
    selectedCategory: number | null = null;
    filteredProducts: Producto[] = [];
    
  ngOnInit() {
    this.mostrarProductos();
    this.mostrarCategorias();
    this.filtrarProductosPorCategoria();
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

  registrarVenta(carrito: Producto[]){
    if (carrito.length === 0) {
      this.mostrarSnackBar('El carrito está vacío. Agrega productos antes de finalizar la compra.');
      return;
    }
    this.mostrarProductos();
    carrito.forEach(product => {
      const productoBD = this.listaProductos.find((productoLista ) => productoLista .idProducto === product.idProducto);
      if (productoBD){
        productoBD.ventas += product.ventas;
        productoBD.stock -= product.ventas;
        this._productoServicio.update(productoBD.idProducto,productoBD).subscribe({
          next:(data) =>{
            this.mostrarSnackBar('Venta finalizada con éxito');
          },error:(e)=>{
          }
        })
      }
    })
  }

  showCards = false;
  volverMenu(){
    this.appComponent.showCards = true;
    this.router.navigate(['/']);
  }

  mostrarSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
    this.mostrarProductos();
  }

  eliminarProductoDelCarrito(producto: Producto) {
    const index = this.carrito.indexOf(producto);  
    if (index !== -1) {
      this.carrito.splice(index, 1);
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

    console.log(this.filteredProducts);
  }

  getGridColumns(): number {
    const isFilteredProductsOdd = this.filteredProducts.length % 2 !== 0;
    const isListaProductosOdd = this.listaProductos.length % 2 !== 0;
  
    if ((this.selectedCategory !== null && isFilteredProductsOdd) || (this.selectedCategory === null && isListaProductosOdd)) {
      return 1;
    }
    return 2;
  }

}

