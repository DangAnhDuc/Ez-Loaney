import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import * as firebase from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "angularfire2/database";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  user = {
    name: "",
    profilePicture: "",
    email: "",
    uid: "",
    loggedIn: false
  };

  u;
  constructor(
    private fire: AngularFireAuth,
    public navCtrl: NavController,
    public router: Router,
    public db: AngularFireDatabase
  ) { }

  loginWithFacebook() {
    this.fire.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        this.user.email = res.user.email;
        this.user.uid = res.user.uid;
        firebase
          .database()
          .ref()
          .child("Users")
          .orderByChild("User_Email")
          .equalTo(this.user.email)
          .once("value", snapshot => {
            var urlID;
            if (snapshot.exists()) {
              snapshot.forEach(function (childSnapshot) {

                console.log(childSnapshot.val());
                urlID = childSnapshot.child("User_ID").val();
              });
              this.router.navigate(["newfeed", urlID]);

            } else {
              this.user.loggedIn = true;
              this.user.name = res.user.displayName;
              this.user.email = res.user.email;
              this.user.profilePicture = res.user.photoURL;
              this.user.uid = res.user.uid;
              var myRef = firebase
                .database()
                .ref()
                .child("Users/")
                .push({
                  User_Name: this.user.name,
                  User_PhotoURL: this.user.profilePicture,
                  User_Email: this.user.email,
                  User_ID: this.user.uid
                });
              var key = myRef.key;
              firebase
                .database()
                .ref()
                .child("Users/" + key)
                .update({ User_ID: key });
              this.user.uid = key;
              this.router.navigate(["newfeed", this.user.uid]);
            }
          });
      })
      .catch(error => {
        alert(error);
      });
  }

  loginWithGoogle() {
    this.fire.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => {
        this.user.email = res.user.email;
        this.user.uid = res.user.uid;
        firebase
          .database()
          .ref()
          .child("Users")
          .orderByChild("User_Email")
          .equalTo(this.user.email)
          .once("value", snapshot => {
            var urlID;
            if (snapshot.exists()) {
              snapshot.forEach(function (childSnapshot) {

                console.log(childSnapshot.val());
                urlID = childSnapshot.child("User_ID").val();
              });
              this.router.navigate(["newfeed", urlID]);

            } else {
              this.user.loggedIn = true;
              this.user.name = res.user.displayName;
              this.user.email = res.user.email;
              this.user.profilePicture = res.user.photoURL;
              this.user.uid = res.user.uid;
              var myRef = firebase
                .database()
                .ref()
                .child("Users/")
                .push({
                  User_Name: this.user.name,
                  User_PhotoURL: this.user.profilePicture,
                  User_Email: this.user.email,
                  User_ID: this.user.uid
                });
              var key = myRef.key;
              firebase
                .database()
                .ref()
                .child("Users/" + key)
                .update({ User_ID: key });
              this.user.uid = key;
              this.router.navigate(["newfeed", this.user.uid]);
            }
          });
      })
      .catch(error => {
        alert(error);
      });
  }
}
