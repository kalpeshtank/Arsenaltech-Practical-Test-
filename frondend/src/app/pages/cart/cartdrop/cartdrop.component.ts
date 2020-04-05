import { Component, OnInit, Inject } from '@angular/core';
import { BehaviorService } from 'src/app/_services/behavior.service';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { MainApiService } from 'src/app/_services/main-api.service';

@Component({
  selector: 'app-cartdrop',
  templateUrl: './cartdrop.component.html',
  styleUrls: ['./cartdrop.component.css']
})
export class CartdropComponent implements OnInit {
  CartData: any = [];
  item_Total: any = 0;
  constructor(
    private _mainAPiServiceService: MainApiService,
    private behaviorService: BehaviorService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    this.behaviorService.cartData$.subscribe(result => {
      if (result) {
        this.item_Total = 0;
        this.CartData = result;
        this.CartData.forEach(element => {
          this.item_Total += element.price * element.quantity;
        });
      } else {
        this.CartData = [];
        this.item_Total = 0;
      }
    });
  }

  ngOnInit() {
  }
  removeAll() {
    this.storage.remove('cart_data');
    this.behaviorService.setCartData([]);
    this.item_Total = 0;
    this.CartData = [];
    this._mainAPiServiceService.SetDataAPI({ 'user_id': this.storage.get('user_id') }, 'clear').subscribe(res => {
      if (res.status == 200) { }
    }, err => {
      console.log(err);
    });
  }
}
