import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { AuthService } from './services/auth.service';
import { BreakpointService } from './services/breakpoint.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    { provide: 'Window', useFactory: () => window },
    AuthService,
    BreakpointService,
  ],
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
