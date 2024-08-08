import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tagModel } from '../models/tag.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = 'http://localhost:3000/AirTags'; // URL da API

  constructor(private http: HttpClient) { }

  getTags(): Observable<tagModel[]> {
    return this.http.get<tagModel[]>(this.apiUrl).pipe(
      catchError(this.handleError<tagModel[]>('getTags', []))
    );
  }

  getTag(codigo: number): Observable<tagModel> {
    const url = `${this.apiUrl}/${codigo}`;
    return this.http.get<tagModel>(url).pipe(
      catchError(this.handleError<tagModel>(`getTags codigo=${codigo}`))
    );
  }

  obterAirTagsDisponiveis(){
    return this.http.get<tagModel[]>(this.apiUrl + "/ObterAirTagsDisponiveis").pipe(
      catchError(this.handleError<tagModel[]>('obterAirTagsDisponiveis', []))
    );
  }

  tag(tag: tagModel): Observable<tagModel> {
    return this.http.post<tagModel>(this.apiUrl, tag).pipe(
      catchError(this.handleError<tagModel>('addTag'))
    );
  }

  updateTag(tag: tagModel): Observable<any> {
    return this.http.put(this.apiUrl, tag).pipe(
      catchError(this.handleError<any>('updateTag'))
    );
  }

  deleteTag(codigo: number): Observable<tagModel> {
    const url = `${this.apiUrl}/${codigo}`;
    return this.http.delete<tagModel>(url).pipe(
      catchError(this.handleError<tagModel>('deleteTag'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
