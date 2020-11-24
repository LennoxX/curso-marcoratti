import { ProdutoService } from './../services/produtos.service';
import { BaseFormComponent } from './../../../shared/components/base-form/base-form.component';
import { CategoriaService } from './../../categorias/services/categorias.service';
import { Produto } from './../models/produto.model';
import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Categoria } from '../../categorias/models/categoria.model';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.css']
})
export class ProdutosFormComponent extends BaseFormComponent<Produto> {
  

  categorias: Categoria[] = new Array();

  constructor(
    protected categoriaService: CategoriaService,
    protected produtoService: ProdutoService,
    protected messageService: MessageService,
    protected injector: Injector,
    protected confirmationService: ConfirmationService) {
    super(messageService, injector, produtoService,  confirmationService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.loadCategorias();
  }

  loadCategorias() {
    setTimeout(() => {
      this.categoriaService.getAll().subscribe((res) => {
        this.categorias = res;
        this.loading = false;
      }, (err) => {
        this.actionsForError(err);
      })
    }, 1000);

  }
  buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      descricao: [null, Validators.required],
      preco: [null, Validators.required],
      imagemUrl: [null, Validators.required],
      estoque: [null, Validators.min(0)],
      dataCadastro: [null],
      categoria: [null, Validators.required],
    });
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

 

  protected createResource() {
    let tmpResource: Produto = new Produto();
    Object.assign(tmpResource, this.resourceForm.value);
    tmpResource.categoriaId = tmpResource.categoria.id;
    this.produtoService.create(tmpResource).subscribe((res)=>{
      this.actionsForSuccess();
    }, (err)=>{
      this.actionsForError(err);
    });
  }
  protected updateResource() {
    let tmpResource: Produto = new Produto();
    Object.assign(tmpResource, this.resourceForm.value);
    tmpResource.categoriaId = tmpResource.categoria.id;
    this.produtoService.update(tmpResource).subscribe((res)=>{
      this.actionsForSuccess();
    }, (err)=>{
      this.actionsForError(err);
    });
  }

}
