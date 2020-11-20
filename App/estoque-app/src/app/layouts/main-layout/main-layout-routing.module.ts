import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'categorias', loadChildren: ()=> import('./../../pages/categorias/categorias.module').then(m=>m.CategoriasModule)},
  {path: 'produtos', loadChildren: ()=> import('./../../pages/produtos/produtos.module').then(m=>m.ProdutosModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
