import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export class BreakpointService {
  isPalm$: Observable<boolean>;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.isPalm$ = this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Small])
      .pipe(
        map((state: BreakpointState) => state.matches),
        shareReplay()
      );
  }
}
