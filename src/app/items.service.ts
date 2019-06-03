import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  firedata = firebase.database().ref("/Items");
  constructor(public fireauth: AngularFireAuth) { }

  getallitems(){
    var promise=new Promise((resolve,reject)=>{
      this.firedata.orderByChild('Item_ID').once('value',(snapshot)=>{
        let itemdata=snapshot.val()
        let temparr=[]
        for(var key in itemdata){
          temparr.push(itemdata[key])
        }
        resolve(temparr)
      }).catch(error=>{
        reject(error);
      })
    })
    return promise;
  }

  getlistingitems(){
    var promise=new Promise((resolve,reject)=>{
      this.firedata.orderByChild('Item_Owner').equalTo(firebase.auth().currentUser.uid).once('value',(snapshot)=>{
        let itemdata=snapshot.val()
        let temparr=[]
        for(var key in itemdata){
          temparr.push(itemdata[key])
        }
        resolve(temparr)
      }).catch(error=>{
        reject(error);
      })
    })
    return promise;
  }

  getrenteditems(){
    var promise=new Promise((resolve,reject)=>{
      this.firedata.orderByChild('Item_RentedBy').equalTo(firebase.auth().currentUser.uid).once('value',(snapshot)=>{
        let itemdata=snapshot.val()
        let temparr=[]
        for(var key in itemdata){
          temparr.push(itemdata[key])
        }
        resolve(temparr)
      }).catch(error=>{
        reject(error);
      })
    })
    return promise;
  }
}
