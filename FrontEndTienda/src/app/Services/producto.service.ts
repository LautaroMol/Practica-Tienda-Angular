import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
    private endpoint:string = environment.endpoint;
    private apiUrl:string  = this.endpoint +  "producto/";
    constructor( private http:HttpClient) { }

    getList(): Observable<Producto[]> {
      return this.http.get<Producto[]>(`${this.apiUrl}lista`);
    }

    add(modelo:Producto):Observable<Producto>{
      return this.http.post<Producto>(`${this.apiUrl}guardar`,modelo);
    }

    update(modelo:Producto,idProducto:number):Observable<Producto>{
      return this.http.put<Producto>(`${this.apiUrl}actualizar/${idProducto}`,modelo);
    }
    delete(idProducto:number):Observable<void>{
      return this.http.delete<void>(`${this.apiUrl}borrar/${idProducto}`);
    }
}
