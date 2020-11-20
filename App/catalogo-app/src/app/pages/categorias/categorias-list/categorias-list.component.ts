import { BaseListComponent } from './../../../shared/components/base-list/base-list.component';
import { CategoriaService } from './../services/categoria.service';
import { Component, OnInit, Injector } from '@angular/core';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-categorias-list',
  templateUrl: './categorias-list.component.html',
  styleUrls: ['./categorias-list.component.css']
})
export class CategoriasListComponent extends BaseListComponent<Categoria> {

  resources = new Array();
  loading: boolean;

  constructor(protected categoriaService:CategoriaService, protected injector:Injector) {
    super(categoriaService, injector);
  }

}
