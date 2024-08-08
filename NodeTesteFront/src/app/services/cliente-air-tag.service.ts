import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { clienteAirTagModel } from '../models/clienteAirTag.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteAirTagService {

  private apiUrl = 'http://localhost:3000/ClienteAirTag'; // URL da API

  constructor(private http: HttpClient) { }

  ObterAirTagsPorCliente(clienteId:number): Observable<clienteAirTagModel[]> {
    return this.http.get<clienteAirTagModel[]>(this.apiUrl + "/ObterAirTagsPorCliente/" + clienteId).pipe(
      catchError(this.handleError<clienteAirTagModel[]>('ObterAirTagsPorCliente', []))
    );
  }

  DevolverAirTag(codigoLocacao:number){
    return this.http.get<clienteAirTagModel[]>(this.apiUrl + "/DevolverAirTag/" + codigoLocacao).pipe(
      catchError(this.handleError<clienteAirTagModel[]>('DevolverAirTag', []))
    );
  }

  InserirLocacaoAirTag(codigoCliente:number, codigoAirTag:number, alias:string){
    return this.http.post<clienteAirTagModel[]>(this.apiUrl + "/InserirLocacaoAirTag", {codigoCliente, codigoAirTag, alias}).pipe(
      catchError(this.handleError<clienteAirTagModel[]>('InserirLocacaoAirTag', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
