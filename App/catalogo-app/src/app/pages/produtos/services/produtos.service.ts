import { Produto } from './../models/produto.model';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseResourceService<Produto> {
  findAllByParameters(page: number, count: number, filters?: Map<any, any>) {
    throw new Error('Method not implemented.');
  }

  constructor(protected injector: Injector) {
    super('produtos', injector);
   }
}
