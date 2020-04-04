import { Component, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  title = 'Practical-test';
  ngOnInit() {
    if (!this.storage.get('user_id')) {
      this.storage.set('user_id', uuidv4());
    }
  }
}
