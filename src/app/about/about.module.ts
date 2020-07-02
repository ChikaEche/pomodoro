import { NgModule } from '@angular/core';
import { AboutComponent } from './about-page/about.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [SharedModule],
})
export class AboutModule {}
