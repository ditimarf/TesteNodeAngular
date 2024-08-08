import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { clienteModel } from '../models/cliente.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  private apiUrl = 'http://localhost:3000/clientes'; // URL da API

  constructor(private http: HttpClient) { }

  getClientes(): Observable<clienteModel[]> {
    return this.http.get<clienteModel[]>(this.apiUrl).pipe(
      catchError(this.handleError<clienteModel[]>('getClientes', []))
    );
  }

  getCliente(codigo: number): Observable<clienteModel> {
    const url = `${this.apiUrl}/${codigo}`;
    return this.http.get<clienteModel>(url).pipe(
      catchError(this.handleError<clienteModel>(`getCliente codigo=${codigo}`))
    );
  }

  addCliente(cliente: clienteModel): Observable<clienteModel> {
    return this.http.post<clienteModel>(this.apiUrl, cliente).pipe(
      catchError(this.handleError<clienteModel>('addCliente'))
    );
  }

  updateCliente(cliente: clienteModel): Observable<any> {
    return this.http.put(this.apiUrl, cliente).pipe(
      catchError(this.handleError<any>('updateCliente'))
    );
  }

  deleteCliente(codigo: number): Observable<clienteModel> {
    const url = `${this.apiUrl}/${codigo}`;
    return this.http.delete<clienteModel>(url).pipe(
      catchError(this.handleError<clienteModel>('deleteCliente'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
