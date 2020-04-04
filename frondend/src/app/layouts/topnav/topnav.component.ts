import { Component, OnInit } from '@angular/core';
import { MainApiService } from 'src/app/_services/main-api.service';
import { BehaviorService } from 'src/app/_services/behavior.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  CartData: any = [];
  constructor(private _mainAPiServiceService: MainApiService, private behaviorService: BehaviorService) {
    this.behaviorService.cartData$.subscribe(result => {
      console.log(result);
      if (result) {
        this.CartData = result;
      }
    });
  }

  ngOnInit() {
  }

}
