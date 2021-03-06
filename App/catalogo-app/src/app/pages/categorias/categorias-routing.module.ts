import { CategoriasFormComponent } from './categorias-form/categorias-form.component';
import { CategoriasListComponent } from './categorias-list/categorias-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: CategoriasListComponent},
  {path: ':id', component: CategoriasFormComponent},
  {path: 'new', component: CategoriasFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
