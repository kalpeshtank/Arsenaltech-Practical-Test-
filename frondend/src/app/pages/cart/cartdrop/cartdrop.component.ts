import { Component, OnInit, Inject } from '@angular/core';
import { BehaviorService } from 'src/app/_services/behavior.service';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

@Component({
  selector: 'app-cartdrop',
  templateUrl: './cartdrop.component.html',
  styleUrls: ['./cartdrop.component.css']
})
export class CartdropComponent implements OnInit {
  CartData: any = [];
  item_Total: any = 0;
  constructor(private behaviorService: BehaviorService,
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
  }
}
