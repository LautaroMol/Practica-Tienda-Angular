import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle,MatDialog} from '@angular/material/dialog';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-producto-add-edit',
  standalone: true,
  imports: [MatButtonModule,MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle],
  templateUrl: './producto-add-edit.component.html',
  styleUrl: './producto-add-edit.component.css'
})
export class ProductoAddEditComponent {
  constructor(
    public dialog: MatDialog
  ){}
  
}
