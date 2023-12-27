import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Producto } from '../../interfaces/producto';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Tipo } from '../../interfaces/tipo';

@Component({
  selector: 'app-delete-tipo',
  standalone: true,
  imports: [MatButtonModule,MatDialogModule],
  templateUrl: './delete-tipo.component.html',
  styleUrl: './delete-tipo.component.css'
})
export class DeleteTipoComponent implements OnInit {
  constructor(
    private dialogoReferencia: MatDialogRef<DeleteTipoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataTipo: Tipo
  ){}
  ngOnInit(): void {
    
  }
  confirmacion(){
    if(this.dataTipo){
      this.dialogoReferencia.close("Eliminar");
    }
  }
}
