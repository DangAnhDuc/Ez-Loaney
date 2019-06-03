import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { ChatService } from "../chat.service";
import { NavController, Events } from "@ionic/angular";
import * as firebase from "firebase";

@Component({
  selector: "app-contactchat",
  templateUrl: "./contactchat.page.html",
  styleUrls: ["./contactchat.page.scss"]
})
export class ContactchatPage implements OnInit {
  @ViewChild("content") private content: any;
  buddy: any;
  newmessage;
  allmessages = [];
  photoURL;
  constructor(
    public chatservice: ChatService,
    public navCtrl: NavController,
    public events: Events,
    public zone: NgZone
  ) {
    this.buddy = this.chatservice.buddy;
    this.photoURL = firebase.auth().currentUser.photoURL;
    this.events.subscribe("newmessage", () => {
      this.allmessages = [];
      this.zone.run(() => {
        this.allmessages = this.chatservice.buddymessages;
      });
    });
  }

  ngOnInit() {}

  addmessage() {
    this.chatservice.addnewmessage(this.newmessage).then(() => {
      this.newmessage = "";
    });
  }

  ionViewDidEnter() {
    this.chatservice.getbuddymessages();
  }
}
