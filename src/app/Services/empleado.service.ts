import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment  } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Empleado } from '../Interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private end_point:string = environment.endPoint;
  private url:string = this.end_point + "empleado/";

  constructor(private http:HttpClient) { }

  getList():Observable<Empleado[]>{
    return this.http.get<Empleado[]>(`${this.url}list`);
  }

  add(empleado:Empleado):Observable<Empleado>{
    return this.http.post<Empleado>(`${this.url}save`, empleado);
  }

  update(id:number, empleado:Empleado):Observable<Empleado>{
    return this.http.put<Empleado>(`${this.url}update/${id}`, empleado);
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.url}delete/${id}`);
  }
}
