import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { TopnavComponent } from './layouts/topnav/topnav.component';
import { CartdropComponent } from './pages/cart/cartdrop/cartdrop.component';

@NgModule({
  declarations: [
    AppComponent, FooterComponent, TopnavComponent, CartdropComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
