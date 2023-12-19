import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { OnInit } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { ProductoService } from '../Services/producto.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-reposicion',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatFormFieldModule,MatInputModule,HttpClientModule],
  templateUrl: './reposicion.component.html',
  styleUrl: './reposicion.component.css'
})
export class ReposicionComponent implements AfterViewInit, OnInit {
  constructor(
    private _productoServicio: ProductoService,
    private _httpClient: HttpClient
  ){
    this.producto = {} as Producto;
  }
  displayedColumns: string[] = ['Nombre', 'Precio', 'Stock', 'Descripcion','Ventas','Codigo de categoria','Categoria','Acciones'];
  dataSource = new MatTableDataSource<Producto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() producto: Producto;
  listaProductos: Producto[] =[];

  ngOnInit(): void {
    this.mostrarProductos()
  }

  mostrarProductos(){
    this._productoServicio.getList().subscribe(
      (productos: Producto[]) => {
        this.listaProductos = productos;
        console.log(this.listaProductos);
    },(error)=>{ 
      console.error('Error al obtener lista', error)
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];