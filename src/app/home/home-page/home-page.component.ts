import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { screenResize } from 'src/assets/screen-resize';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  constructor(private breakPoint: BreakpointService) {}
  breakpoint: Observable<boolean>;
  destroy$ = new Subject<void>();

  isSmall = false;
  screen = { ...screenResize };

  ngOnInit(): void {
    this.breakpoint = this.breakPoint.isPalm$;
    this.breakpoint
      .pipe(
        takeUntil(this.destroy$),
        map((x) => {
          this.isSmall = x;
          this.onScreenResize();
        })
      )
      .subscribe();
    window.localStorage.setItem('email', 'chiks');
  }

  onScreenResize() {
    if (this.isSmall) {
      this.screen.chartResize = 'chart-resize';
      this.screen.featureChartResize = 'feature-chart-resize';
      this.screen.featureChartDescResize = 'chart-desc';
      this.screen.extra = 'extra';
      this.screen.featureDescriptionResize = 'feature-desc-resize';
      this.screen.taskResize = 'task-resize';
      this.screen.featureResize = 'feature-resize';
      this.screen.descriptionResize = 'description-resize';
      this.screen.desktopResize = 'desktop-resize';
    } else {
      this.screen.featureChartResize = '';
      this.screen.chartResize = '';
      this.screen.featureChartDescResize = '';
      this.screen.extra = '';
      this.screen.taskResize = '';
      this.screen.featureResize = '';
      this.screen.featureDescriptionResize = '';
      this.screen.descriptionResize = '';
      this.screen.desktopResize = '';
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
