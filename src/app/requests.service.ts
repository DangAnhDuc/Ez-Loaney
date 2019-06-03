import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { UserService } from "./user.service";
import { Events } from "@ionic/angular";
import { connreq } from "./models/interfaces/request";

@Injectable({
  providedIn: "root"
})
export class RequestsService {
  firereq = firebase.database().ref("/requests");
  userdetails;
  firefriends = firebase.database().ref("/friends");
  myfriends;
  constructor(public userservice: UserService, public events: Events) {}
  sendrequest(req: connreq) {
    var promise = new Promise((resolve, reject) => {
      this.firereq
        .child(req.recipient)
        .push({
          sender: req.sender
        })
        .then(() => {
          resolve({ success: true });
        })
        .catch(err => {
          resolve(err);
        });
    });
    return promise;
  }

  getmyrequests() {
    let allmyrequests;
    var myrequests = [];
    this.firereq
      .child(firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        allmyrequests = snapshot.val();
        myrequests = [];
        for (var i in allmyrequests) {
          myrequests.push(allmyrequests[i].sender);
        }
        this.userservice.getallusers().then(res => {
          var allusers = res;
          this.userdetails = [];
          for (var j in myrequests)
            for (var key in allusers) {
              if (myrequests[j] === allusers[key].User_ID) {
                this.userdetails.push(allusers[key]);
              }
            }
          this.events.publish("gotrequests");
        });
      });
  }

  acceptrequest(buddy) {
    var myfriends = [];
    var promise = new Promise((resolve, reject) => {
      this.firefriends
        .child(firebase.auth().currentUser.uid)
        .push({
          User_ID: buddy.User_ID
        })
        .then(() => {
          this.firefriends
            .child(buddy.User_ID)
            .push({
              User_ID: firebase.auth().currentUser.uid
            })
            .then(() => {
              this.deleterequest(buddy).then(() => {
                resolve(true);
              });
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
    return promise;
  }

  deleterequest(buddy) {
    var promise = new Promise((resolve, reject) => {
      this.firereq
        .child(firebase.auth().currentUser.uid)
        .orderByChild("sender")
        .equalTo(buddy.User_ID)
        .once("value", snapshot => {
          let somekey;
          for (var key in snapshot.val()) somekey = key;
          this.firereq
            .child(firebase.auth().currentUser.uid)
            .child(somekey)
            .remove()
            .then(() => {
              resolve(true);
            });
        })
        .then(() => {})
        .catch(err => {
          reject(err);
        });
    });
    return promise;
  }
  getmyfriends() {
    let friendsuid = [];
    this.firefriends
      .child(firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        let allfriends = snapshot.val();
        this.myfriends = [];
        for (var i in allfriends) {
          friendsuid.push(allfriends[i].User_ID);
        }
        this.userservice
          .getallusers()
          .then(users => {
            this.myfriends = [];
            for (var j in friendsuid)
              for (var key in users) {
                if (friendsuid[j] === users[key].User_ID) {
                  this.myfriends.push(users[key]);
                }
              }
            this.events.publish("friends");
          })
          .catch(err => {
            alert(err);
          });
      });
  }
}
