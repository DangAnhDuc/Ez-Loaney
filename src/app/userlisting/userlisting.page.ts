import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ItemsService } from '../items.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.page.html',
  styleUrls: ['./userlisting.page.scss'],
})
export class UserlistingPage implements OnInit {
  items = [];
  uid: string;
  constructor(public router: Router,public alertCtrl: AlertController,public itemservice:ItemsService) {
    this.itemservice.getlistingitems().then((res: any) => {
      console.log(res)
      this.items = res;
    });
  }

  ngOnInit() {
  }
  userProfile() {
    this.router.navigate(["profile", firebase.auth().currentUser.uid]);
  }

  newFeed(){
    this.router.navigate(["newfeed", firebase.auth().currentUser.uid])
  }
  userRented(){
    this.router.navigate(["userrented", firebase.auth().currentUser.uid]);

  }
  chatUser(){
    this.router.navigate(["chats", firebase.auth().currentUser.uid])
  }
}
