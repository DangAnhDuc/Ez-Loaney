import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ItemdetailService {
  firedata = firebase.database().ref("/Items");
  item: any;
  initializedetail(item) {
    this.item = item;
  }

  constructor() { }

  getitemdetail() {
    var promise=new Promise((resolve,reject)=>{
      this.firedata.child(this.item.Item_ID).once('value',(snapshot)=>{
        resolve(snapshot.val());
      }).catch((error)=>{
        reject(error);
      })
    })
    return promise;
}
}
