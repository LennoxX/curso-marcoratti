
import { MainLayoutModule } from './layouts/main-layout/main-layout.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children:[{
      path: '',
      loadChildren: () => import('../app/layouts/main-layout/main-layout.module').then(m=>m.MainLayoutModule)
    }]
  },  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
