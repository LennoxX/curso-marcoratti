import { Router } from '@angular/router';
import { BaseListComponent } from './../../../shared/components/base-list/base-list.component';
import { CategoriaService } from '../services/categorias.service';
import { Component, OnInit, Injector } from '@angular/core';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-categorias-list',
  templateUrl: './categorias-list.component.html',
  styleUrls: ['./categorias-list.component.css']
})
export class CategoriasListComponent extends BaseListComponent<Categoria> {


  constructor(protected categoriaService:CategoriaService, protected injector:Injector, protected router: Router) {
    super(categoriaService,router, injector);
  }

}
