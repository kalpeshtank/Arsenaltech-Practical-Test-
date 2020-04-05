import { Component, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { v4 as uuidv4 } from 'uuid';
import { MainApiService } from './_services/main-api.service';
import { BehaviorService } from './_services/behavior.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private _mainAPiServiceService: MainApiService,
    private behaviorService: BehaviorService, ) { }

  title = 'Practical-test';
  ngOnInit() {
    if (!this.storage.get('user_id')) {
      this.storage.set('user_id', uuidv4());
    }
    this._mainAPiServiceService.SetDataAPI({ user_id: this.storage.get('user_id') }, 'cart').subscribe(res => {
      if (res.status == 200) {
        this.behaviorService.setCartData(res.data);
      }
    }, err => {
      console.log(err);
    });
  }
}
