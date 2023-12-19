import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { VentaComponent } from './venta/venta.component';
import { ReposicionComponent } from './reposicion/reposicion.component';

const routes: Routes = [
  { path: 'venta', component: VentaComponent},
  { path: 'reposicion', component: ReposicionComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
