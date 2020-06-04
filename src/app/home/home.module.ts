import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [HomePageComponent, FooterComponent],
  imports: [HomeRoutingModule, SharedModule],
  exports: [FooterComponent],
})
export class HomeModule {}
