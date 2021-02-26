import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Plugins} from '@capacitor/core'
import { AlertController } from '@ionic/angular';
const {Storage}=Plugins;
@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.page.html',
  styleUrls: ['./expense-list.page.scss'],
})
export class ExpenseListPage implements OnInit {

  username:any;
  userId:any;
  selectedWay="Daily";
  totalPrice:number=0;
  listOfExpenses = [
  ]
  listOfExpensesBackUp = [
  ]
  constructor(private router:Router,private _route:ActivatedRoute,private alertController:AlertController) {
    this._route.paramMap.subscribe(()=>{
      
    this.loadExpenses();
    })
   }

  ngOnInit() {
    this.getData();
    this.loadExpenses();
  }

  async loadExpenses(){
    await  Storage.get({key:"expenses"}).then((data)=>{
      this.listOfExpenses=JSON.parse(data.value);
      this.listOfExpensesBackUp=this.listOfExpenses;
    })
    
    this.changeExpenseList("Daily");
    var price=0;
    this.listOfExpenses.forEach((item)=>{
      price=price+item.amount;
    })
    this.totalPrice=price;
  }

  async getData(){
    const checkFirstTime = await Storage.get({ key: 'user' });
    this.username  = JSON.parse(checkFirstTime.value).name;
    this.userId  = JSON.parse(checkFirstTime.value).id;
  }

  changeExpenseList(type){
    if(type=="Daily"){
      var list=[];
      console.log(new Date().toDateString())
      this.listOfExpensesBackUp.forEach((data)=>{
        console.log(new Date(data.date).toDateString())
        if(new Date(data.date).toDateString()==new Date().toDateString())
        {
          console.log("here")
          list.push(data);
        }
      })
      console.log(list)
      this.listOfExpenses=list;
      console.log(this.listOfExpenses)
    }

    if(type=="Weekly"){
      var list=[];
      var weekList=[];
      var today=new Date();
      var sunday = new Date(today);
      sunday.setDate(sunday.getDate() -(today.getDay()+1));
      for(var i=0;i<=today.getDay();i++){
        var newdate = this.AddDays(sunday,1);
        weekList.push(newdate);
        sunday=newdate;
      }
      console.log(this.listOfExpensesBackUp);
      weekList.forEach((week)=>{
        console.log(week)
        this.listOfExpensesBackUp.forEach((data)=>{
          if(new Date(week).toDateString()==new Date(data.date).toDateString())
          {
            list.push(data);
          }
        })
      })
      this.listOfExpenses=list;
    }

    if(type=="Monthly"){
      var list=[];
      var monthList=[];
      var today=new Date();
      var sunday = new Date(today);
      sunday.setDate(sunday.getDate() -(today.getDate()+1));
      for(var i=0;i<=today.getDate();i++){
        var newdate = this.AddDays(sunday,1);
        monthList.push(newdate);
        sunday=newdate;
      }
      console.log(this.listOfExpensesBackUp);
      monthList.forEach((week)=>{
        console.log(week)
        this.listOfExpensesBackUp.forEach((data)=>{
          if(new Date(week).toDateString()==new Date(data.date).toDateString())
          {
            list.push(data);
          }
        })
      })
      this.listOfExpenses=list;
    }
    var price=0;
    this.listOfExpenses.forEach((item)=>{
      price=price+item.amount;
    })
    this.totalPrice=price;
  }

    //Add days to date ,eg 1,2,3,4,...31
    AddDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }  

  segmentChanged(event:any){
    this.selectedWay=event.detail.value;
    this.changeExpenseList(this.selectedWay);
  }

  gotoExpenseAdd(){
    this.router.navigate([`/expense-add/${null}`]);
  }

  async delete(id){
    this.listOfExpenses.splice(this.listOfExpenses.findIndex(x=>x.id==id),1)
    await Storage.set({
      key:"expenses",
      value:JSON.stringify(this.listOfExpenses)
    })
    await Storage.get({key:"expenses"}).then((data)=>{
      this.listOfExpenses=JSON.parse(data.value);
      this.listOfExpensesBackUp=this.listOfExpenses;
    })
    this.changeExpenseList(this.selectedWay);
  }

  async edit(id){
    this.router.navigate([`/expense-add/${id}`]);
  }

  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: '<strong>Are you Sure to delete this Expense?</strong>',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.delete(id)
          }
        }
      ]
    });

    await alert.present();
  }

}
