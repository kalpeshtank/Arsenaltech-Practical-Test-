import { Component, OnInit } from '@angular/core';
import { BehaviorService } from 'src/app/_services/behavior.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  CartData: any = [];
  constructor(private behaviorService: BehaviorService) {
    this.behaviorService.cartData$.subscribe(result => {
      if (result) {
        this.CartData = result;
      }
    });
  }

  ngOnInit() {
  }

}
