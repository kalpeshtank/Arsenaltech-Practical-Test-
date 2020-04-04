import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {
  public cartData$: BehaviorSubject<any> = new BehaviorSubject(JSON.parse(this.storage.get('cart_data')));
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) { }
  setCartData(data: any) {
    this.storage.set('cart_data', JSON.stringify(data));
    this.cartData$.next(data);
  }
}
