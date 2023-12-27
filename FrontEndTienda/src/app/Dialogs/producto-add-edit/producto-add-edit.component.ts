import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle,MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Producto } from '../../interfaces/producto';
import { Tipo } from '../../interfaces/tipo';
import { ProductoService } from '../../Services/producto.service';
import { TipoService } from '../../Services/tipo.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';



@Component({
  selector: 'app-producto-add-edit',
  standalone: true,
  imports: [MatButtonModule,MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle,ReactiveFormsModule,MatGridListModule,
    MatInputModule,MatFormFieldModule,MatSelectModule,CommonModule,FormsModule],
  templateUrl: './producto-add-edit.component.html',
  styleUrl: './producto-add-edit.component.css',
  
})
export class ProductoAddEditComponent implements OnInit{

  formProducto: FormGroup;
  tituloAccion: string = "Nuevo"
  botonAccion: string = "Guardar";
  listaCategorias: Tipo[] =[];
  searchText: string = '';
  filteredCategories: Tipo[] = [];
  constructor(
    public dialog: MatDialog,
    private dialogoReferencia:MatDialogRef<ProductoAddEditComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public _tipoServicio: TipoService,
    private _productoServicio: ProductoService,
    @Inject (MAT_DIALOG_DATA) public dataProducto: Producto
  ){
    
    this.formProducto = this.fb.group({
      nombreCompleto: ['',Validators.required],
      codTipo: ['',Validators.required],
      precio: ['',Validators.required],
      stock: ['',Validators.required],
      descripcion: ['',Validators.required],
    })
  }
  
  ngOnInit() {
    this.traerTipos();  
    if(this.dataProducto){
      this.formProducto.patchValue({
        nombreCompleto: this.dataProducto.nombre,
        codTipo: this.dataProducto.codTipo,
        precio: this.dataProducto.precio,
        stock: this.dataProducto.stock,
        descripcion: this.dataProducto.descripcion
      })
      this.tituloAccion="Editar"
      this.botonAccion="Actualizar"
    }
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCategories = this.listaCategorias.filter((cat) =>
      cat.nombre.toLowerCase().includes(filterValue)
    );
  }
  onSelectDropdownOpened() {
      // Lógica a realizar cuando se abre el mat-select (si es necesario)
    }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000
    });
  }

  addEditProducto(){
    console.log(this.formProducto.value)

    const prod: Producto ={
      idProducto: 0,
      nombre: this.formProducto.value.nombreCompleto,
      precio: this.formProducto.value.precio,
      stock: this.formProducto.value.stock,
      descripcion: this.formProducto.value.descripcion,
      ventas: 0,
      codTipo: this.formProducto.value.codTipo
    }

    if(this.dataProducto == null){
      this._productoServicio.add(prod).subscribe({
        next:(data) =>{
          this.mostrarAlerta("Producto cargado al sistema exitosamente","Listo");
          this.dialogoReferencia.close("Creado");
        },error:(e)=>{
          this.mostrarAlerta("No se ha podido crear el producto","Error");
        }
      })
    }else{
      prod.ventas= this.dataProducto.ventas
      this._productoServicio.update(this.dataProducto.idProducto,prod).subscribe({
        next:(data) =>{
          this.mostrarAlerta("Producto editado correctamente","Listo");
          this.dialogoReferencia.close("Editado");
        },error:(e)=>{
          this.mostrarAlerta("No se ha podido Editar el producto","Error");
        }
      })
    }

  }
  selectedValue!: string;
  
  traerTipos(){
    this._tipoServicio.getList().subscribe({
      next: (data) => {
        console.log('Datos de Categorías:', data);
        this.listaCategorias = data;
        this.filteredCategories = [...data];
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
