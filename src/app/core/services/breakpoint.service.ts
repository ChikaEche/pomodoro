import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  isPalm$: Observable<boolean>;
  check: boolean;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.isPalm$ = this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Small, Breakpoints.Tablet])
      .pipe(
        map((state: BreakpointState) => state.matches),
        shareReplay()
      );
  }
}
