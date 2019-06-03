import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Events } from '@ionic/angular';
import { connreq } from './models/interfaces/request';
import { resolve, reject } from 'q';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  firedata = firebase.database().ref("/Users");
  constructor(public fireauth: AngularFireAuth) {}


  getuserdetails(){
    var promise=new Promise((resolve,reject)=>{
      this.firedata.child(firebase.auth().currentUser.uid).once('value',(snapshot)=>{
        resolve(snapshot.val());
      }).catch((error)=>{
        reject(error);
      })
    })
    return promise;
  }

  getallusers(){
    var promise=new Promise((resolve,reject)=>{
      this.firedata.orderByChild('User_ID').once('value',(snapshot)=>{
        let userdata=snapshot.val()
        let temparr=[]
        for(var key in userdata){
          temparr.push(userdata[key])
        }
        resolve(temparr)
      }).catch(error=>{
        reject(error);
      })
    })
    return promise;
  }
}
