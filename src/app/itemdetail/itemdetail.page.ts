import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ItemdetailService } from '../itemdetail.service';

@Component({
  selector: 'app-itemdetail',
  templateUrl: './itemdetail.page.html',
  styleUrls: ['./itemdetail.page.scss'],
})
export class ItemdetailPage implements OnInit {
  imageUrl:string;
  title:string;
  description:string;
  deposit:string;
  listed_date:string;
  multi_quantity:string;
  price;
  constructor(public navCtrl: NavController,
    public itemdetailservice: ItemdetailService,
    public zone: NgZone,
    public alertCtrl: AlertController,
    public router:Router) { }

  ngOnInit() {

    this.itemdetailservice.getitemdetail().then((res:any)=>{
      this.title=res.Item_Title;
      this.description=res.Item_Description;
      this.zone.run(() => {
        this.imageUrl = res.Item_PhotoURL;
      });
      this.deposit=res.Item_Deposit;
      this.listed_date=res.Item_ListedTime;
      this.price=res.Item_Price;
      this.multi_quantity=res.Item_MultiQua;
    });
  }

}
