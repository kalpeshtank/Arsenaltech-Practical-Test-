import { Component, OnInit, Inject } from '@angular/core';
import { MainApiService } from 'src/app/_services/main-api.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorService } from 'src/app/_services/behavior.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  ProductData: any = [];
  CartData: any = [];
  constructor(
    private _mainAPiServiceService: MainApiService,
    private behaviorService: BehaviorService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private toastr: ToastrService
  ) {
    this.behaviorService.cartData$.subscribe(result => {
      if (result) {
        this.CartData = result;
      }
    });
  }

  ngOnInit() {
    this._mainAPiServiceService.getDataAPI('products?user_id=' + this.storage.get('user_id')).subscribe(res => {
      if (res.status == 200) {
        this.ProductData = res.data;
      }
    }, err => {
      this.toastr.error(err);
    });
  }
  addToCart(data: any) {
    data.quantity = 1;
    this.CartData.push(data);
    this.behaviorService.setCartData(this.CartData);
    this._mainAPiServiceService.SetDataAPI(data, 'add').subscribe(res => {
      if (res.status == 200) {
        this.toastr.success(res.message);
      }
    }, err => {
      this.toastr.error(err);
    });
  }

}
