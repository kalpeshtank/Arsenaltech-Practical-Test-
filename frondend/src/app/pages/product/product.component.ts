import { Component, OnInit, Inject } from '@angular/core';
import { MainApiService } from 'src/app/_services/main-api.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { BehaviorService } from 'src/app/_services/behavior.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  ProductData: any = [];
  CartData: any = [];
  successMsg: any;
  constructor(
    private _mainAPiServiceService: MainApiService,
    private behaviorService: BehaviorService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
  ) {
    this.behaviorService.cartData$.subscribe(result => {
      if (result) {
        this.CartData = result;
      }
    });
  }

  ngOnInit() {
    this._mainAPiServiceService.getDataAPI('products').subscribe(res => {
      if (res.status == 200) {
        this.ProductData = res.data;
      }
    }, err => {
      console.log(err);
    });
  }
  addToCart(data: any) {
    this.successMsg = "";
    let TemCartData = this.CartData;
    let qty = 1;
    const indexData = this.CartData.findIndex(cart => cart.id === data.id);
    if (indexData > -1) {
      qty += TemCartData[indexData].quantity;
      TemCartData.splice(indexData, 1);
    }
    // this.CartData = TemCartData;
    data.quantity = qty;
    data.user_id = this.storage.get('user_id');
    this.CartData.push(data);
    this.behaviorService.setCartData(this.CartData);
    this._mainAPiServiceService.SetDataAPI(data, 'add').subscribe(res => {
      if (res.status == 200) {
        this.successMsg = res.message;
      }
    }, err => {
      console.log(err);
    });
  }

}
