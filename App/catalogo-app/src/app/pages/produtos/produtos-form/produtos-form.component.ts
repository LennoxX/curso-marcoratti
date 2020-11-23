import { CategoriaService } from './../../categorias/services/categorias.service';
import { ProdutoService } from './../services/produtos.service';
import { Produto } from './../models/produto.model';
import { AfterContentChecked, Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';
import { Categoria } from '../../categorias/models/categoria.model';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.css']
})
export class ProdutosFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  pageTitle: string;
  resourceForm: FormGroup;
  resource: Produto;
  submittingForm: boolean = false;  
  categorias: Categoria[] = new Array();
  loading: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;
 

  constructor(
    protected messageService: MessageService, protected injector: Injector,
    protected produtoService: ProdutoService, private categoriaService:CategoriaService,
    protected confirmationService: ConfirmationService) {
      this.route = this.injector.get(ActivatedRoute);
      this.router = this.injector.get(Router);
      this.formBuilder = this.injector.get(FormBuilder);
  }
  

  ngOnInit(): void {
    this.loading = true;
    this.setCurrentAction();
    this.loadResource();
    this.buildResourceForm()

  }
  loadCategorias() {
    setTimeout(() => {
      this.categoriaService.getAll().subscribe((res)=>{
        this.categorias = res;
        this.loading = false;
      }, (err)=>{
        this.actionsForError(err);
      })
    }, 3000);
  
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

  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }


  protected loadResource() {
    this.loading = true;
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.produtoService.findById(+params.get('id')))
      ).subscribe(
        (resource) => {
          this.resource = resource;
          this.resourceForm.patchValue(resource);
          this.loadCategorias();
        },
        (error) => this.actionsForError(error)
      );
    }
  }

  submitForm() {


    this.submittingForm = true;


    if (this.currentAction === 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }

  }

  protected createResource() {
    let tmpResource: Produto = Object.assign(new Produto(), this.resourceForm.value);
    this.produtoService.create(tmpResource).subscribe(
      () => this.actionsForSuccess(),
      error => this.actionsForError(error)
    );
  }

  protected updateResource() {
    let tmpResource: Produto = Object.assign(new Produto(), this.resourceForm.value);
    tmpResource.categoriaId = tmpResource.categoria.id;
    this.produtoService.update(tmpResource).subscribe(
      () => this.actionsForSuccess(),
      error => this.actionsForError(error)
    );
  }


  protected setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Novo';
    } else {
      this.pageTitle = 'Edição';
    }
  }

  protected actionsForSuccess() {
    const baseComponentPath: string = this.route.parent.snapshot.url[0].path;
    this.router.navigateByUrl(baseComponentPath).then(
      () => this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Solicitação Processada com Sucesso!'
      }));
  }

  protected actionsForError(error) {
    const baseComponentPath: string = this.route.parent.snapshot.url[0].path;
    this.submittingForm = false;
    this.router.navigateByUrl(baseComponentPath).then(
      () => this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: error.error.errors != null ? error.error.errors[0] : 'Falha na aplicação'
      }));
  }

  confirm(){
    console.log('AQUi')
    this.confirmationService.confirm({
      accept: () => {
        this.submitForm()
      },

    });
  }

}
