import { Routes } from '@angular/router';
import { VentaComponent } from './venta/venta.component';
import { ReposicionComponent } from './reposicion/reposicion.component';

export const routes: Routes = [
    { path: 'venta', component: VentaComponent},
    { path: 'reposicion', component: ReposicionComponent}
];
