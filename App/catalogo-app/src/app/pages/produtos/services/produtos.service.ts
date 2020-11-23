import { Produto } from './../models/produto.model';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseResourceService<Produto> {

  constructor(protected injector: Injector) {
    super('produtos', injector);
   }
}
