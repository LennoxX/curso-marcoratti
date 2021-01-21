import { Router } from '@angular/router';
import { BaseListComponent } from './../../../shared/components/base-list/base-list.component';
import { Produto } from './../models/produto.model';
import { ProdutoService } from './../services/produtos.service';
import { Component, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.css']
})
export class ProdutosListComponent extends BaseListComponent<Produto>  {



  constructor(protected produtoService: ProdutoService, protected injector: Injector, protected router: Router) {
    super(produtoService,router, injector);
  }




}
