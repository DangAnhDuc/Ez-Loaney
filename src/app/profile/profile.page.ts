import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  avatar: string;
  displayName: string;
  email: string;
  constructor(public navCtrl: NavController,
    public userservice: UserService,
    public zone: NgZone,
    public alertCtrl: AlertController,
    public router:Router) { 
  }
  ngOnInit() {
    this.userservice.getuserdetails().then((res:any)=>{
      this.displayName=res.User_Name;
      this.email=res.User_Email;
      this.zone.run(() => {
        this.avatar = res.User_PhotoURL;
      });
    });
  }
  chatUser(){
    this.router.navigate(["chats", firebase.auth().currentUser.uid])
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
}
