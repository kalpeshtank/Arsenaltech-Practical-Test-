import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {
  public cartData$: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() { }
  setCartData(data: any) {
    this.cartData$.next(data);
  }
}
