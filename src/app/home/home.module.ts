import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from '../shared/components/footer/footer.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [HomeRoutingModule, SharedModule],
  exports: [],
})
export class HomeModule {}
