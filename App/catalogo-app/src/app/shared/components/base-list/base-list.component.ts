import { Component, OnInit, Injector } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.css']
})
export class BaseListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = new Array();
  loading: boolean = false;
  confirmationService: ConfirmationService;
  messageService: MessageService;

  constructor(
    protected resourceService: BaseResourceService<T>,
    protected injector:Injector) { 
      this.confirmationService = this.injector.get(ConfirmationService);
      this.messageService = this.injector.get(MessageService);
    }

  ngOnInit(): void {
    this.getResources();
  }
  getResources() {
    this.loading = true;
    this.resourceService.getAll().subscribe((res)=>{
      this.resources = res;
      console.log(res)
      this.loading = false;
    }, (err) => {
      console.log(err);
      this.actionsForError(err);
      this.loading = false;
    })
  }


  protected actionsForError(error: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Atenção!',
      detail: error.error
    });
  }

  protected actionsForSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Solicitação Processada com Sucesso!'
    });
  }

}
