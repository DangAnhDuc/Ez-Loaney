import { Component, OnInit } from '@angular/core';
import { NavController, Events, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { RequestsService } from '../requests.service';
import { ChatService } from '../chat.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  buddy:any;
  myrequests;
  myfriends;
  constructor(
    public navCtrl: NavController,
    public router: Router,
    public requestservice: RequestsService,
    public events: Events,
    public alertCtrl: AlertController,
    public chatservice:ChatService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.requestservice.getmyrequests();
    this.requestservice.getmyfriends();
    this.myfriends = [];
    this.events.subscribe("gotrequests", () => {
      this.myrequests = [];
      this.myrequests = this.requestservice.userdetails;
    });
    this.events.subscribe("friends", () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
    });
  }

  ionViewDidLeave() {
    this.events.unsubscribe("gotrequests");
  }

  accept(item) {
    this.requestservice.acceptrequest(item).then(async () => {
      const alert = await this.alertCtrl.create({
        header: "Friend added",
        message: "Tap on the friend to chat with him",
        buttons: ["OK"]
      });

      await alert.present();
    });
  }

  ignore(item) {
    this.requestservice
      .deleterequest(item)
      .then(() => {
        alert("Request ignored");
      })
      .catch(error => {
        alert(error);
      });
  }

  contactchat(buddy){
    this.chatservice.initializebuddy(buddy);
    this.router.navigate(["contactchat",firebase.auth().currentUser.uid])
  }

  backHome(){
    console.log(firebase.auth().currentUser.uid);
    this.router.navigate(["newfeed", firebase.auth().currentUser.uid])
  }

  addUser(){
    this.router.navigate(["searchusers",firebase.auth().currentUser.uid])
  }
}
