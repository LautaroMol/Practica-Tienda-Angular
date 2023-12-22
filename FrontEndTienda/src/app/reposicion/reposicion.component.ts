import {AfterViewInit, Component, Input, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Producto } from '../interfaces/producto';
import { ProductoService } from '../Services/producto.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle,MatDialog} from '@angular/material/dialog';
import { ProductoAddEditComponent } from '../Dialogs/producto-add-edit/producto-add-edit.component';
import { MatButtonModule } from '@angular/material/button';
import { TipoService } from '../Services/tipo.service';
import { Tipo } from '../interfaces/tipo';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reposicion',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatFormFieldModule,MatInputModule,HttpClientModule,MatIconModule,MatDialogActions,
    MatDialogClose,MatDialogContent,MatDialogTitle,MatButtonModule,CommonModule],
  templateUrl: './reposicion.component.html',
  styleUrl: './reposicion.component.css'
})
export class ReposicionComponent implements AfterViewInit, OnInit {
  constructor(
    private _productoServicio: ProductoService,
    public dialog: MatDialog,
    private _tipoServicio: TipoService,
    
  ){
    this.producto = {} as Producto;
  }
  displayedColumns: string[] = ['Nombre', 'Precio', 'Stock', 'Descripcion','Ventas','Codigo de categoria','Categoria','Acciones'];
  dataSource = new MatTableDataSource<Producto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() producto: Producto;
  listaProductos: Producto[] =[];
  listaCategorias: Tipo[] =[];
  ngOnInit() {
    this.mostrarProductos();
  }


  mostrarProductos(){
    this._productoServicio.getList().subscribe({
        next:(dataResponse) => {
          this.dataSource.data = dataResponse;
        },error:(e)=>{ 
      (e);}
    })
  }

  ngAfterViewInit() {
    this.mostrarProductos();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  DialogoNuevoProducto() {
    this.dialog.open(ProductoAddEditComponent,{
      disableClose:true,
      width:"400px"
    }).afterClosed().subscribe(resultado =>{
      if(resultado ==="Creado"){
        this.mostrarProductos();
      }
    });
  }

  editarProducto(){}

  cancelarEdicion(){}
}
