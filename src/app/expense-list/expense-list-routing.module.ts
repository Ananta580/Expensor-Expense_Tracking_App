import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseListPage } from './expense-list.page';

const routes: Routes = [
  {
    path: '',
    component: ExpenseListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseListPageRoutingModule {}
