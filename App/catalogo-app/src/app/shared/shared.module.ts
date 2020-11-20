import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


import { BaseFormComponent } from './components/base-form/base-form.component';
import { BaseListComponent } from './components/base-list/base-list.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { NavComponent } from './nav/nav.component';





@NgModule({
  declarations: [NavComponent, MenuComponent, FooterComponent, BaseFormComponent, BaseListComponent],
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ProgressBarModule,
    ConfirmDialogModule,
    ToastModule
  ],
  exports:[
    NavComponent,
    MenuComponent,
    FooterComponent,
    TableModule,
    ProgressBarModule,
    ProgressBarModule,
    ConfirmDialogModule,
    ToastModule
  ],

})
export class SharedModule { }
