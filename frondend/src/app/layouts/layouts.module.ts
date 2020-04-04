import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { TopnavComponent } from './topnav/topnav.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FooterComponent, TopnavComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule
  ]
})
export class LayoutsModule { }
