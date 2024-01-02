import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon';
import { Router,ActivatedRoute,  } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MatCardModule,MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  showCards = true;

  constructor(private router: Router, private route: ActivatedRoute) {

  }


   
  navigateTo(route: string) {
    this.showCards = false;
    this.router.navigate([route], { relativeTo: this.route });
  }
  
}

