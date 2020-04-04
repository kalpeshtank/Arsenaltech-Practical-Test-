import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { TopnavComponent } from './layouts/topnav/topnav.component';
import { CartdropComponent } from './pages/cart/cartdrop/cartdrop.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent, FooterComponent, TopnavComponent, CartdropComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StorageServiceModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
