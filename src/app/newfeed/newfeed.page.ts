import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import * as firebase from "firebase";
import { RouterTestingModule } from "@angular/router/testing";
import { AlertController } from '@ionic/angular';
import { ItemsService } from '../items.service';
import { ItemdetailService } from '../itemdetail.service';

@Component({
  selector: "app-newfeed",
  templateUrl: "./newfeed.page.html",
  styleUrls: ["./newfeed.page.scss"]
})
export class NewfeedPage implements OnInit {
  items = [];
  item:any;
  constructor(public router: Router,public alertCtrl: AlertController,public itemservice:ItemsService,public itemdetailservice:ItemdetailService) {
    this.itemservice.getallitems().then((res: any) => {
      console.log(res)
      this.items = res;
    });
  }

  ngOnInit() {}

  chatUser() {
    this.router.navigate(["chats", firebase.auth().currentUser.uid]);
  }
  userProfile() {
    this.router.navigate(["profile", firebase.auth().currentUser.uid]);
  }

  userListing(){
    this.router.navigate(["userlisting", firebase.auth().currentUser.uid]);

  }
  userRented(){
    this.router.navigate(["userrented", firebase.auth().currentUser.uid]);

  }

  itemDetail(key){
    this.itemdetailservice.initializedetail(key)
    this.router.navigate(["itemdetail",key.Item_ID]);
  }
}
