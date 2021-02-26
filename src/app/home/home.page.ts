import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Plugins} from '@capacitor/core'
const {Storage}=Plugins;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  constructor(private router:Router) {
    this.getData()
  }

  async getData(){
    const checkFirstTime = await Storage.get({ key: 'firsttime' });
    console.log(checkFirstTime)
    if(JSON.parse(checkFirstTime.value)!=null){
    const firsttime  = JSON.parse(checkFirstTime.value).firsttime;
    if(firsttime==false){
      this.router.navigate(["/expense-list"])
    }
    }
    else{
      this.router.navigate(["/welcome"]);
    }
  }
}
