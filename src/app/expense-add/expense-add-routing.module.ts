import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseAddPage } from './expense-add.page';

const routes: Routes = [
  {
    path: '',
    component: ExpenseAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseAddPageRoutingModule {}
