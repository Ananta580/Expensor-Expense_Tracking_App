import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpenseAddPageRoutingModule } from './expense-add-routing.module';

import { ExpenseAddPage } from './expense-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseAddPageRoutingModule
  ],
  declarations: [ExpenseAddPage]
})
export class ExpenseAddPageModule {}
