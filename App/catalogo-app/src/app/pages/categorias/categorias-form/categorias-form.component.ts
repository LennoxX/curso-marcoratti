import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { Categoria } from '../models/categoria.model';
import { CategoriaService } from '../services/categorias.service';

@Component({
  selector: 'app-categorias-form',
  templateUrl: './categorias-form.component.html',
  styleUrls: ['./categorias-form.component.css']
})
export class CategoriasFormComponent extends BaseFormComponent<Categoria> implements OnInit {

  constructor(
    protected categoriaService: CategoriaService,
    protected messageService: MessageService,
    protected injector: Injector,
    protected confirmationService: ConfirmationService) {
    super(messageService, injector, categoriaService, confirmationService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  protected createResource() {
    let tmpResource: Categoria = new Categoria();
    Object.assign(tmpResource, this.resourceForm.value);
    this.categoriaService.create(tmpResource).subscribe((res)=>{
      this.actionsForSuccess();
    }, (err)=>{
      this.actionsForError(err);
    });
  }
  protected updateResource() {
    let tmpResource: Categoria = new Categoria();
    Object.assign(tmpResource, this.resourceForm.value);
    this.categoriaService.update(tmpResource).subscribe((res)=>{
      this.actionsForSuccess();
    }, (err)=>{
      this.actionsForError(err);
    });
  }
  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      imagemUrl: [null, Validators.required],
    });
  }
}
