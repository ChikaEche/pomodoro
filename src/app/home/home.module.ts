import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, HomeRoutingModule, MatRippleModule],
})
export class HomeModule {}
