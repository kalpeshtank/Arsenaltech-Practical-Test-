import { Component, OnInit } from '@angular/core';
import { MainApiService } from 'src/app/_services/main-api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private _mainAPiServiceService: MainApiService) { }

  ngOnInit() {
    this._mainAPiServiceService.SetDataAPI({}, 'products').subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
