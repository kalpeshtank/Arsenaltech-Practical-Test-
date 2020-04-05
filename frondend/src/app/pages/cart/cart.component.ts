import { Component, OnInit, Inject } from '@angular/core';
import { BehaviorService } from 'src/app/_services/behavior.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { MainApiService } from 'src/app/_services/main-api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  successMsg: any;
  CartData: any = [];
  item_Total: any = 0;
  qty_Total: any = 0;
  constructor(private behaviorService: BehaviorService,
    private _mainAPiServiceService: MainApiService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    this.behaviorService.cartData$.subscribe(result => {
      if (result) {
        this.item_Total = 0;
        this.qty_Total = 0;
        this.CartData = result;
        this.CartData.forEach(element => {
          this.item_Total += element.price * element.quantity;
          this.qty_Total += element.quantity;
        });
      }
    });
  }

  ngOnInit() {
    this._mainAPiServiceService.SetDataAPI({ user_id: this.storage.get('user_id') }, 'cart').subscribe(res => {
      if (res.status == 200) {
        this.behaviorService.setCartData(res.data);
      }
    }, err => {
      console.log(err);
    });
  }
  removeAll() {
    this.storage.remove('cart_data');
    this.behaviorService.setCartData([]);
    this.item_Total = 0;
    this.qty_Total = 0;
    this.CartData = [];
    this._mainAPiServiceService.SetDataAPI({ 'user_id': this.storage.get('user_id') }, 'clear').subscribe(res => {
      if (res.status == 200) {
        this.successMsg = res.message;
      }
    }, err => {
      console.log(err);
    });
  }
  removeOne(id: any) {
    let TemCartData = this.CartData;
    const indexData = this.CartData.findIndex(cart => cart.id === id);
    let tempId = (TemCartData[indexData].product_id) ? TemCartData[indexData].product_id : TemCartData[indexData].id;
    if (indexData > -1) {
      TemCartData.splice(indexData, 1);
    }
    this.CartData = TemCartData;
    this.behaviorService.setCartData(TemCartData);
    this._mainAPiServiceService.SetDataAPI({ 'id': tempId, 'user_id': this.storage.get('user_id') }, 'remove').subscribe(res => {
      if (res.status == 200) {
        this.successMsg = res.message;
      }
    }, err => {
      console.log(err);
    });
  }
  updateQty(item: any, id: any) {
    if (item.quantity <= 0) {
      let TemCartData = this.CartData;
      const indexData = this.CartData.findIndex(cart => cart.id === id);
      if (indexData > -1) {
        TemCartData.splice(indexData, 1);
      }
      this.CartData = TemCartData;
    }
    this.behaviorService.setCartData(this.CartData);
    if (item.quantity > 0) {
      item.user_id = this.storage.get('user_id');
      item.is_updtae = true;
      this._mainAPiServiceService.SetDataAPI(item, 'add').subscribe(res => {
        if (res.status == 200) {
          this.successMsg = res.message;
        }
      }, err => {
        console.log(err);
      });
    }

  }
}
