import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Plugins } from '@capacitor/core'
import { Guid } from 'guid-typescript';
import { ActivatedRoute, Router } from '@angular/router';
const { Storage } = Plugins;
@Component({
  selector: 'app-expense-add',
  templateUrl: './expense-add.page.html',
  styleUrls: ['./expense-add.page.scss'],
})
export class ExpenseAddPage implements OnInit {
  customAlertOptions: any = {
    header: 'Expense Name',
  };
  name: any;
  amount: number;
  date: Date;
  maxDate:any;
  showAddForm = false;
  listOfExpenseName = [];
  expenseList = [];
  expenseId: any;
  constructor(private modalController: ModalController, private router: Router, private _route: ActivatedRoute) {
    this.expenseId = this._route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.maxDate=new Date();
    console.log(this.maxDate)
    this.loadExpenses();
  }

  async loadExpenses() {
    var list = [];
    await Storage.get({ key: "expenses" }).then((data) => {
      list = JSON.parse(data.value)
      console.log(list);
      this.expenseList = list;
    })
    console.log(this.expenseId)
    if (this.expenseId!="null") {
      this.name = this.expenseList[this.expenseList.findIndex(x => x.id.value == this.expenseId)].name;
      this.amount = this.expenseList[this.expenseList.findIndex(x => x.id.value == this.expenseId)].amount;
      this.date = this.expenseList[this.expenseList.findIndex(x => x.id.value == this.expenseId)].date;
    }
  }

  async AddExpense() {
    if (this.expenseList == null) {
      this.expenseList = [];
    }
    console.log(this.expenseId)
    if (this.expenseId == "null") {
      this.expenseList.push({
        id: Guid.create(),
        name: this.name,
        amount: this.amount,
        date: this.date
      })
    }

    else {
      this.expenseList[this.expenseList.findIndex(x => x.id.value == this.expenseId)].name = this.name;
      this.expenseList[this.expenseList.findIndex(x => x.id.value == this.expenseId)].amount = this.amount;
      this.expenseList[this.expenseList.findIndex(x => x.id.value == this.expenseId)].date = this.date;
    }

    await Storage.set({
      key: "expenses",
      value: JSON.stringify(this.expenseList)
    })
    this.router.navigate(['expense-list']);
  }
}
