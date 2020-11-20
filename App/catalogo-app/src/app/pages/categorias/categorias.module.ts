import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasListComponent } from './categorias-list/categorias-list.component';


@NgModule({
  declarations: [CategoriasListComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    SharedModule
  ]
})
export class CategoriasModule { }
