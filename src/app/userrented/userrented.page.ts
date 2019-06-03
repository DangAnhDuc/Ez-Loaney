import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ItemsService } from '../items.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-userrented',
  templateUrl: './userrented.page.html',
  styleUrls: ['./userrented.page.scss'],
})
export class UserrentedPage implements OnInit {
  items = [];
  uid: string;
  constructor(public router: Router,public alertCtrl: AlertController,public itemservice:ItemsService) {
    this.itemservice.getrenteditems().then((res: any) => {
      console.log(res)
      this.items = res;
    });
  }

  ngOnInit() {
  }
  userProfile() {
    this.router.navigate(["profile", firebase.auth().currentUser.uid]);
  }

  userListing(){
    this.router.navigate(["userlisting", firebase.auth().currentUser.uid]);

  }
  newFeed(){
    this.router.navigate(["newfeed", firebase.auth().currentUser.uid])
  }
  chatUser(){
    this.router.navigate(["chats", firebase.auth().currentUser.uid])
  }
}
