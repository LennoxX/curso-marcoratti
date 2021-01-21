import { Router } from '@angular/router';
import { Cliente } from './../models/produto.model';
import { BaseListComponent } from '../../../shared/components/base-list/base-list.component';
import { Component, Injector, EventEmitter, Output } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})

export class ClienteListComponent extends BaseListComponent<Cliente>  {

  searchField = new Subject<string>();
  @Output() searchChangeEmitter: EventEmitter<any> = new EventEmitter();

  constructor(protected clienteService: ClienteService, protected injector: Injector, protected router: Router) {
    super(clienteService, router, injector);
    this.filters.set('filterNome', { filtro: '', type: 'input' });
    this.filters.set('filterSobrenome', { filtro: '', type: 'input' });
    this.filters.set('filterEmail', { filtro: '', type: 'input' });
    this.sort.set('field', {name: '', order: ''});

    this.searchField.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(() => {
        this.loadResourcesLazy(this.pageIndex);
      });
  }


  customSort(event) {
   this.sort.set('field', {name: event.field, order: event.order == 1 ? 'asc' : 'desc' })
   this.loadResourcesLazy(this.pageIndex);
   console.log(this.sort.get('field'))
}

  onSearchType(value: string) {
    this.searchField.next(value);
  }

  loadLazy(event) {
    this.pageIndex = (event.first / event.rows) + 1;
    this.loadResourcesLazy(this.pageIndex);
  }

  protected loadResourcesLazy(pageIndex: number) {
    this.loading = true;
    this.resourceService.findAllByParameters(pageIndex, this.count, this.filters, this.sort).subscribe(
      pages => {
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

  excluir(item) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir o Cliente ' + item.nome + ' ?',
      accept: () => {
        this.loading = true;
        this.clienteService.delete(item.id).subscribe(res => {
          this.loadResourcesLazy(this.pageIndex);
          this.actionsForSuccess();
        }, (err) => {
          this.actionsForError(err)
          this.loading = false;
        })
      }
    })
  }

}
