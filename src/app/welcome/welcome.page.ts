import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Plugins} from '@capacitor/core'
import { Guid } from 'guid-typescript';
import { getuid } from 'process';
const {Storage}=Plugins;
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  name:any;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  gotoMainPage(){
    this.setObject();
  }

  async setObject() {
    await Storage.set({
      key: 'firsttime',
      value: JSON.stringify({
        firsttime: false,
      })
    });
    await Storage.set({
      key: 'user',
      value: JSON.stringify({
        name: this.name,
        id:Guid.create()
      })
    });
    this.router.navigate(["/expense-list"])
  }

}
