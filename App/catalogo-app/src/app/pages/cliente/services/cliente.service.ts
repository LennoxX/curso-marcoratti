import { Cliente } from './../models/produto.model';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Page } from 'src/app/shared/models/page.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseResourceService<Cliente> {

  constructor(protected injector: Injector) {
    super('cliente', injector);
   }

  findAllByParameters(page: number, count: number, filters?: Map<any, any>, sort?:Map<any,any>) {
    const filterNome = filters.get('filterNome').filtro 
    const filterSobrenome = filters.get('filterSobrenome').filtro 
    const filterEmail = filters.get('filterEmail').filtro 
    const sortBy = sort.get('field').name
    const sortOrder = sort.get('field').order
    const url = `${this.API_PATH}/paged?pageNumber=${page}&pageSize=${count}&filterNome=${filterNome}&filterSobrenome=${filterSobrenome}&filterEmail=${filterEmail}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataPagesToResources)
    );
  }
  



   
   
}
