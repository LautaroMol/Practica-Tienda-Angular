import { Component, Inject,OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle,MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder,FormGroup,Validators,ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Tipo } from '../../interfaces/tipo';
import { ProductoService } from '../../Services/producto.service';
import { TipoService } from '../../Services/tipo.service';
import { Producto } from '../../interfaces/producto';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { empty } from 'rxjs';

@Component({
  selector: 'app-tipo-add-edit',
  standalone: true,
  imports: [MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle,ReactiveFormsModule,MatGridListModule,
    MatInputModule,MatFormFieldModule,MatSelectModule,MatGridListModule,MatButtonModule],
  templateUrl: './tipo-add-edit.component.html',
  styleUrl: './tipo-add-edit.component.css'
})
export class TipoAddEditComponent implements OnInit {

  formTipo: FormGroup;
  tituloAccion: string = "Nuevo"
  botonAccion: string = "Guardar";
  listaCategorias: Tipo[] =[];
  listaProductos: Producto[] = [];

  constructor(
    public dialog: MatDialog,
    private dialogoReferencia:MatDialogRef<TipoAddEditComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public _tipoServicio: TipoService,
    private _productoServicio: ProductoService,
    @Inject (MAT_DIALOG_DATA) public dataTipo: Tipo
  ){
    this.formTipo = this.fb.group({
      codTipo: ['',Validators.required],
      nombre: ['',Validators.required],
      descripcion: ['',Validators.required]
    })
  }
  
  ngOnInit() {
    this.traerTipos();
    if(this.dataTipo){
      this.formTipo.patchValue({
        codTipo: this.dataTipo.codTipo,
        nombre: this.dataTipo.nombre,
        descripcion: this.dataTipo.descripcion,
      })
      this.formTipo.get('codTipo')?.disable();
      this.tituloAccion="Editar"
      this.botonAccion="Actualizar"
    }
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000
    });}
    

    addEditTipo() {
      console.log(this.formTipo.value);
      this._tipoServicio.getList().subscribe({
        next: (data) => {
          this.listaCategorias = data;
          let categoriaExistente = false;
          const tipo: Tipo = {
            idTipo: 0,
            codTipo: this.formTipo.value.codTipo,
            nombre: this.formTipo.value.nombre,
            descripcion: this.formTipo.value.descripcion
          };    
          for (var item of data) {
            if (Number(item.codTipo) === Number(this.formTipo.value.codTipo)) {
              categoriaExistente = true;
              break;
            }
          }    
          if (this.dataTipo == null) {
            if (categoriaExistente) {
              this.mostrarAlerta("La categoría con el mismo código ya existe", "Error");
            } else {
              this._tipoServicio.add(tipo).subscribe({
                next: (data) => {
                  this.mostrarAlerta("Categoría cargada exitosamente", "Creado");
                  this.dialogoReferencia.close("Creado");
                },
                error: (e) => {
                  this.mostrarAlerta("No se ha podido crear la categoría", "Error");
                }
              });
            }
          } else {
              tipo.codTipo = this.dataTipo.codTipo;
              this._tipoServicio.update(tipo, this.dataTipo.idTipo).subscribe({
                next: (data) => {
                  this.mostrarAlerta("Categoría editada exitosamente", "Creado");
                  this.dialogoReferencia.close("Editado");
                },
                error: (e) => {
                  this.mostrarAlerta("No se ha podido editar la categoría", "Error");
                }
              });
          }
        },
        error: (e) => {
          console.log(e);
        },
      });
    }   
    

    traerTipos(){
      this._tipoServicio.getList().subscribe({
        next: (data) => {
          this.listaCategorias = data;
        },
        error: (e) => {
          console.log(e);
        },
      });
    }

    TraerProductos(){
      this ._productoServicio.getList().subscribe({
        next:(data) => {
          this.listaProductos  = data;
        },error:(e) =>{
          console.error(e);
        },});
      }

  }

