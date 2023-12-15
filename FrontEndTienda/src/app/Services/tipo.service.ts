import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import { Tipo } from '../interfaces/tipo';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  private endpoint:string = environment.endpoint;
  private apiUrl:string  = this.endpoint +  "tipo/";

  constructor( private http:HttpClient) { }

  getList(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(`${this.apiUrl}lista`);
  }
  add(modelo:Tipo):Observable<Tipo>{
    return this.http.post<Tipo>(`${this.apiUrl}guardar`,modelo);
  }

  update(modelo:Tipo,idTipo:number):Observable<Tipo>{
    return this.http.put<Tipo>(`${this.apiUrl}actualizar/${idTipo}`,modelo);
  }
  delete(idTipo:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}borrar/${idTipo}`);
  }
  
}
