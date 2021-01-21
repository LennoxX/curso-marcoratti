import { Categoria } from '../models/categoria.model';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseResourceService<Categoria> {
  findAllByParameters(page: number, count: number, filters?: Map<any, any>) {
    throw new Error('Method not implemented.');
  }

  constructor(protected injector: Injector) {
    super('categorias', injector);
   }
}
