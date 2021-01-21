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
import {InputMaskModule} from 'primeng/inputmask';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';




export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};


@NgModule({
  declarations: [NavComponent, MenuComponent, FooterComponent, BaseListComponent],
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ProgressBarModule,
    ConfirmDialogModule,
    ToastModule,
    InputMaskModule,
    CurrencyMaskModule,
    InputNumberModule,
    DropdownModule,
    CheckboxModule
  ],
  exports:[
    NavComponent,
    MenuComponent,
    FooterComponent,
    TableModule,
    ProgressBarModule,
    ProgressBarModule,
    ConfirmDialogModule,
    ToastModule,
    InputMaskModule,
    CurrencyMaskModule,
    InputNumberModule,
    DropdownModule,
    CheckboxModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ]

})
export class SharedModule { }
