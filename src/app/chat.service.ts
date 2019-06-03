import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { Events } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  firebuddychats = firebase.database().ref("/buddychats");
  buddy: any;
  buddymessages = [];
  constructor(public events: Events) {}

  initializebuddy(buddy) {
    this.buddy = buddy;
  }

  addnewmessage(msg) {
    if (this.buddy) {
      var promise = new Promise((resolve, reject) => {
        this.firebuddychats
          .child(firebase.auth().currentUser.uid)
          .child(this.buddy.User_ID)
          .push({
            sendby: firebase.auth().currentUser.uid,
            message: msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          })
          .then(() => {
            this.firebuddychats
              .child(this.buddy.User_ID)
              .child(firebase.auth().currentUser.uid)
              .push({
                sentby: firebase.auth().currentUser.uid,
                message: msg,
                timestamp: firebase.database.ServerValue.TIMESTAMP
              })
              .then(() => {
                resolve(true);
              })
              .catch(error => {
                reject(error);
              });
          });
      });
    }
    return promise;
  }

  getbuddymessages() {
    let temp;
    this.firebuddychats
      .child(firebase.auth().currentUser.uid)
      .child(this.buddy.User_ID)
      .on("value", snapshot => {
        this.buddymessages = [];
        temp = snapshot.val();
        for (var tempkey in temp) {
          this.buddymessages.push(temp[tempkey]);
        }
        this.events.publish("newmessage");
      });
  }
}
