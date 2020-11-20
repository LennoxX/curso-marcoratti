import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';

import {TableModule} from 'primeng/table';
import {ProgressBarModule} from 'primeng/progressbar';


@NgModule({
  declarations: [NavComponent, MenuComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ProgressBarModule
    
  ],
  exports:[
    NavComponent,
    MenuComponent,
    FooterComponent,
    TableModule,
    ProgressBarModule
  ]
})
export class SharedModule { }
