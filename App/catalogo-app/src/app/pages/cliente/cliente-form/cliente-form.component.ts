import { BaseFormComponent } from '../../../shared/components/base-form/base-form.component';
import { CategoriaService } from '../../categorias/services/categorias.service';
import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Categoria } from '../../categorias/models/categoria.model';
import { Cliente } from '../models/produto.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent extends BaseFormComponent<Cliente> {
  

  categorias: Categoria[] = new Array();

  constructor(
    protected categoriaService: CategoriaService,
    protected clienteService: ClienteService,
    protected messageService: MessageService,
    protected injector: Injector,
    protected confirmationService: ConfirmationService) {
    super(messageService, injector, clienteService,  confirmationService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

 
  buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      sobrenome: [null, Validators.required],
      email: [null, Validators.required],
      ativo: [null, Validators.required],
      dataCadastro: [null],
    });
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

 

  protected createResource() {
    let tmpResource: Cliente = new Cliente();
    Object.assign(tmpResource, this.resourceForm.value);
    this.clienteService.create(tmpResource).subscribe((res)=>{
      this.actionsForSuccess();
    }, (err)=>{
      this.actionsForError(err);
    });
  }
  protected updateResource() {
    let tmpResource: Cliente = new Cliente();
    Object.assign(tmpResource, this.resourceForm.value);
    this.clienteService.update(tmpResource).subscribe((res)=>{
      this.actionsForSuccess();
    }, (err)=>{
      this.actionsForError(err);
    });
  }

}
