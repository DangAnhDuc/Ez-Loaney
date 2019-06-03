import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import {connreq} from "../models/interfaces/request";
import { RequestsService } from '../requests.service';
import { UserService } from '../user.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-searchusers',
  templateUrl: './searchusers.page.html',
  styleUrls: ['./searchusers.page.scss'],
})
export class SearchusersPage implements OnInit {
  newrequest = {} as connreq;
  temparr = [];
  filteredusers = [];
  constructor(public navCtrl: NavController,
    public router: Router,public alertCtrl: AlertController,
    public requestservice: RequestsService,public userservice: UserService) {
      this.userservice.getallusers().then((res: any) => {
        console.log(res)
        this.filteredusers = res;
        this.temparr = res;
      });
     }

  ngOnInit() {
  }

  backChats(){
    this.router.navigate(["chats",firebase.auth().currentUser.uid])
  }

  searchuser(searchbar){
    this.filteredusers=this.temparr;
    var q=searchbar.target.value;
    if(q.trim()==""){
      return;
    }

    this.filteredusers=this.filteredusers.filter(v=>{
      if(v.User_Name.toLowerCase().indexOf(q.toLowerCase())>-1){
        return true;
      }
      return false;
    });
  }

  sendreq(recipient){
    this.newrequest.sender=firebase.auth().currentUser.uid;
    this.newrequest.recipient=recipient.User_ID;
    if(this.newrequest.sender===this.newrequest.recipient){
      alert("Cannot chat with yourself")
    }
    else{
      this.requestservice
          .sendrequest(this.newrequest)
          .then(async(res:any)=>{
            if(res.success){
              const successalert= await this.alertCtrl.create({
                header:"Request sent",
                message:"Your request was sent to "+recipient.User_Name,
                buttons: ["ok"]
              });
              await successalert.present();
              let sentuser=this.filteredusers.indexOf(recipient)
              this.filteredusers.splice(sentuser,1)
            }
          })
          .catch(error=>{
            alert(error)
          });
    }
  }
}
