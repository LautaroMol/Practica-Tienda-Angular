import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Producto } from '../../interfaces/producto';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-producto',
  standalone: true,
  imports: [MatButtonModule,MatDialogModule],
  templateUrl: './delete-producto.component.html',
  styleUrl: './delete-producto.component.css'
})
export class DeleteProductoComponent implements OnInit {

  constructor(
    private dialogoReferencia: MatDialogRef<DeleteProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataProducto: Producto
  ){}


  ngOnInit(): void {
    
  }

  confirmacion(){
    if(this.dataProducto){
      this.dialogoReferencia.close("Eliminar");
    }
  }

}
