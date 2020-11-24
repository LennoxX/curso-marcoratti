import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { AfterContentChecked, Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BaseResourceModel } from '../../models/base-resource.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.css']
})
export abstract class BaseFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction: string;
  pageTitle: string;
  resourceForm: FormGroup;
  resource: T;
  submittingForm: boolean = false;
  loading: boolean = false;


  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;
  constructor(protected messageService: MessageService,
    protected injector: Injector,
    private baseResourceService: BaseResourceService<T>,
    protected confirmationService: ConfirmationService) {

    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.loadResource();
    this.buildResourceForm();
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
        switchMap(params => this.baseResourceService.findById(+params.get('id')))
      ).subscribe(
        (resource) => {
          this.resource = resource;
          this.resourceForm.patchValue(resource);
          this.loading = false;
        },
        (error) => {
          this.actionsForError(error);
          this.loading = false;
        }
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

  confirm() {
    this.confirmationService.confirm({
      accept: () => {
        this.submitForm()
      },
    });
  }

  protected abstract createResource()

  protected abstract updateResource()

  protected abstract buildResourceForm()


}
