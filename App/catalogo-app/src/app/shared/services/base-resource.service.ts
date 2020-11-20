
import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseResourceModel } from '../models/base-resource.model';
import { environment } from 'src/environments/environment';


export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;
  protected readonly API_PATH = `${environment.BASE_URL + this.path}`

  constructor(protected path: string, protected injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    const url = `${this.API_PATH}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResources)
    );
  }

 

  findById(id: number): Observable<T> {
    const url = `${this.API_PATH}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)
    );
  }

  create(resource: T): Observable<T> {
    const url = `${this.API_PATH}`;
    return this.http.post(url, resource).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)
    );
  }

  update(resource: T): Observable<T> {
    const url = `${this.API_PATH}`;
    return this.http.put(url, resource).pipe(
      catchError(this.handleError),
      map(() => resource)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.API_PATH}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  // Metodos Protegidos

  protected jsonDataToResources(jsonData: T[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(element => resources.push(element as T));
    return resources;
  }

  protected jsonDataToResource(jsonData: T): T {
    return jsonData as T;
  }
/* 
  protected jsonDataPagesToResources(jsonData: Response<Page<T>>): Page<T> {
    const resources = Object.assign(new Response(), jsonData.data);
    return resources;
  } */

  protected handleError(error): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO', error);
    // ERROR UNAUTHORIZED
    if (error.status === '401') {
      // REDIRECIONA PARA A TELA DE LOGIN
      window.location.replace('/auth/login');
    } else if (error.status === '0') {
      window.location.replace('/auth/login');
    }
    return throwError(error);
  }

}