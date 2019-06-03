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
  ) {}

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
          .orderByChild("User_ID")
          .equalTo(this.user.uid)
          .once("value", snapshot => {
            if (snapshot.exists()) {
              this.router.navigate(["newfeed", this.user.uid]);
            } else {
              this.user.loggedIn = true;
              this.user.name = res.user.displayName;
              this.user.email = res.user.email;
              this.user.profilePicture = res.user.photoURL;
              this.user.uid = res.user.uid;
              var myRef = firebase
                .database()
                .ref()
                .child("Users/" + this.user.uid)
                .set({
                  User_Name: this.user.name,
                  User_PhotoURL: this.user.profilePicture,
                  User_Email: this.user.email,
                  User_ID: this.user.uid
                });
              this.router.navigate(["newfeed", firebase.auth().currentUser.uid]);
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
        this.user.uid = res.user.uid;
        firebase
          .database()
          .ref()
          .child("Users")
          .orderByChild("User_ID")
          .equalTo(this.user.uid)
          .once("value", snapshot => {
            if (snapshot.exists()) {
              this.router.navigate(["newfeed", this.user.uid]);
            } else {
              this.user.loggedIn = true;
              this.user.name = res.user.displayName;
              this.user.email = res.user.email;
              this.user.profilePicture = res.user.photoURL;
              this.user.uid = res.user.uid;
              var myRef = firebase
                .database()
                .ref()
                .child("Users/" + this.user.uid)
                .set({
                  User_Name: this.user.name,
                  User_PhotoURL: this.user.profilePicture,
                  User_Email: this.user.email,
                  User_ID: this.user.uid
                });
              this.router.navigate(["newfeed", firebase.auth().currentUser.uid]);
            }
          });
      })
      .catch(error => {
        alert(error);
      });
  }
}
