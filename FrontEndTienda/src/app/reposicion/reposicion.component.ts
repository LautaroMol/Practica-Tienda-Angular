import {AfterViewInit, Component, Input, ViewChild, OnInit, Inject} from '@angular/core';
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
import { TipoAddEditComponent } from '../Dialogs/tipo-add-edit/tipo-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteProductoComponent } from '../Dialogs/delete-producto/delete-producto.component';
import { DeleteTipoComponent } from '../Dialogs/delete-tipo/delete-tipo.component';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-reposicion',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatFormFieldModule,MatInputModule,HttpClientModule,MatIconModule,MatDialogActions,
    MatDialogClose,MatDialogContent,MatDialogTitle,MatButtonModule,CommonModule,DeleteProductoComponent],
  templateUrl: './reposicion.component.html',
  styleUrl: './reposicion.component.css'
})
export class ReposicionComponent implements AfterViewInit, OnInit {
  constructor(
    private _productoServicio: ProductoService,
    public dialog: MatDialog,
    private _tipoServicio: TipoService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private appComponent: AppComponent
  ){
    this.producto = {} as Producto;
  }

  displayedColumns: string[] = ['Nombre', 'Precio', 'Stock', 'Descripcion','Ventas','Codigo de categoria','Categoria','Acciones'];
  dataSource = new MatTableDataSource<Producto>();
  dataSourceTipo = new MatTableDataSource<Tipo>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('paginatorTipo') paginatorTipo!: MatPaginator; // Asi se asigna un nombre uno al paginator

  @Input() producto: Producto;
  listaProductos: Producto[] =[];
  listaCategorias: Tipo[] =[];
  ngOnInit() {
    this.mostrarProductos();
    this.mostrarCategorias();
  }


  mostrarProductos(){
    this._productoServicio.getList().subscribe({
        next:(dataResponse) => {
          this.dataSource.data = dataResponse;
        },error:(e)=>{ 
      (e);}
    })
  }

  mostrarCategorias(){
    this._tipoServicio.getList().subscribe({
      next: (data) => {
        this.listaCategorias = data;
        this.dataSourceTipo.data = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  ngAfterViewInit() {
    this.mostrarProductos();
    this.mostrarCategorias();
    this.dataSource.paginator = this.paginator;
    this.dataSourceTipo.paginator = this.paginatorTipo;
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilterTipo(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTipo.filter = filterValue.trim().toLocaleLowerCase();
    if (this.dataSourceTipo.paginator){
      this.dataSourceTipo.paginator.firstPage();
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
  DialogoNuevaCategoria(){
    this.dialog.open(TipoAddEditComponent,{
      disableClose:true,
      width:"400px"
    }).afterClosed().subscribe(resultado =>{
      if(resultado ==="Creado"){
        this.mostrarCategorias();
      }
    });
  }

  DialogoEditarProducto(dataProducto: Producto) {
    this.dialog.open(ProductoAddEditComponent,{
      disableClose:true,
      width:"400px",
      data: dataProducto
    }).afterClosed().subscribe(resultado =>{
      if(resultado ==="Editado"){
        this.mostrarProductos();
      }
    });
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000
    });
  }

  dialogoBorrarProducto(dataProducto: Producto) {
    this.dialog.open(DeleteProductoComponent,{
      disableClose:true,
      width:"400px",
      data: dataProducto
    }).afterClosed().subscribe(resultado =>{
      if(resultado ==="Eliminar"){
        this._productoServicio.delete(dataProducto.idProducto).subscribe({
          next:(data) =>{
            this.mostrarAlerta("Producto Borrado", "Listo");
            this.mostrarProductos();
          },error:(e) =>{}
        })
      }
    });
  }

  editarCategoria(dataCategoria: Tipo) {
    this.dialog.open(TipoAddEditComponent,{
      disableClose:true,
      width:"400px",
      data: dataCategoria
    }).afterClosed().subscribe(resultado =>{
      if(resultado ==="Editado"){
        this.mostrarCategorias();
      }
    });
  }

  dialogoBorrarCategoria(dataCategoria: Tipo){
    this.dialog.open(DeleteTipoComponent,{
      disableClose:true,
      width:"400px",
      data: dataCategoria
    }).afterClosed().subscribe(resultado =>{
      if(resultado ==="Eliminar"){
        this._tipoServicio.delete(dataCategoria.idTipo).subscribe({
          next:(data) =>{
            this.mostrarAlerta("Categoria Borrada", "Listo");
            this.mostrarCategorias();
          },error:(e) =>{}
        })
      }
    });
  }
  showCards = false;
  volverMenu(){
    this.appComponent.showCards = true;
    this.router.navigate(['/']);
  }
}
