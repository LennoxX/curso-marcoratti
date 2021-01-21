import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.css']
})
export class BaseListComponent<T extends BaseResourceModel>  {

  page = 0;
  count = 10;
  totalRecords: number;
  pageIndex: number;

  filters = new Map();
  sort = new Map();

  resources: T[] = new Array();
  loading: boolean = false;
  confirmationService: ConfirmationService;
  messageService: MessageService;
  protected route: ActivatedRoute;
  constructor(
    protected resourceService: BaseResourceService<T>,
    protected router: Router,
    protected injector:Injector) { 
      this.confirmationService = this.injector.get(ConfirmationService);
      this.messageService = this.injector.get(MessageService);
      this.route = this.injector.get(ActivatedRoute);
      this.router = this.injector.get(Router);
    }

  protected loadResourcesLazy(pageIndex: number) {
    this.loading = true;
    this.resourceService.findAll(pageIndex, this.count).subscribe(
      pages => {
        console.log(pages)
        this.resources = pages.content;
        this.totalRecords = pages.totalElements;
        this.loading = false;
      },
      error => {
        this.actionsForError(error);
        this.loading = false;
      }
    );
  }


  protected actionsForSuccess() {
    console.log("AQUi")
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
    this.router.navigateByUrl(baseComponentPath).then(
      () => this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: error.error.errors != null ? error.error.errors[0] : 'Falha na aplicação'
      }));
  }

}
