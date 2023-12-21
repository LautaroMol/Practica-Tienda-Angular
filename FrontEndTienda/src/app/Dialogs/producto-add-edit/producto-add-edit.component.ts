import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle,MatDialog} from '@angular/material/dialog';
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
export class ProductoAddEditComponent {

  formProducto: FormGroup;
  tituloAccion: string = "Nuevo"
  botonAccion: string = "Guardar";
  listaCategorias: Tipo[] =[];
  constructor(
    public dialog: MatDialog,
    private dialogoReferencia:MatDialogRef<ProductoAddEditComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _tipoServicio: TipoService,
    private _productoServicio: ProductoService,
  ){
    
    this.formProducto = this.fb.group({
      nombreCompleto: ['',Validators.required],
      codTipo: ['',Validators.required],
      precio: ['',Validators.required],
      stock: ['',Validators.required],
      descripcion: ['',Validators.required],
      nombreTipo:[null, Validators.required],
    })

    this ._tipoServicio.getList().subscribe({
      next:(data) =>{
        this.listaCategorias = data;
        console.log(this.listaCategorias);
      },error:(e)=>{}
    })
  }

  ngOninit() {
    this ._tipoServicio.getList().subscribe({
      next:(data) =>{
        this.listaCategorias = data;
        console.log(this.listaCategorias);
      },error:(e)=>{}
    });
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000
    });
  }

  addEditProducto(){
    console.log(this.formProducto)
    console.log(this.formProducto.value)
  }
  selectedValue!: string;
  

}
