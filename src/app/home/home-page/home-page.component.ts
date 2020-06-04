import { Component, OnInit } from '@angular/core';
import { BreakpointService } from 'src/app/cores/services/breakpoint.service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private breakPoint: BreakpointService) {}
  breakpoint: Observable<boolean>;

  featureChartDesc = 'feature-desc';
  extra = 'extra';
  featureChartDescResize = '';
  featureChart = 'feature-chart';
  chart = 'chart';
  featureChartResize = '';
  chartResize = '';
  description = 'description';
  desktop = 'desktop';
  desktopResize = '';
  descriptionResize = '';
  isSmall = false;
  taskResize = '';
  featureResize = '';
  feature = 'feature';
  featureDescriptionResize = '';
  featureDescription = 'feature-desc';
  task = 'task';

  ngOnInit(): void {
    this.breakpoint = this.breakPoint.isPalm$;
    this.breakpoint
      .pipe(
        map((x) => {
          console.log(x);
          this.isSmall = x;
          this.onScreenResize();
        })
      )
      .subscribe();
  }

  onScreenResize() {
    console.log('en');
    if (this.isSmall) {
      console.log('tr');
      this.chartResize = 'chart-resize';
      this.featureChartResize = 'feature-chart-resize';
      this.featureChartDescResize = 'chart-desc';
      this.extra = 'extra';
      this.featureDescriptionResize = 'feature-desc-resize';
      this.taskResize = 'task-resize';
      this.featureResize = 'feature-resize';
      this.descriptionResize = 'description-resize';
      this.desktopResize = 'desktop-resize';
      console.log(this.featureResize);
    } else {
      this.featureChartResize = '';
      this.chartResize = '';
      this.featureChartDescResize = '';
      this.extra = '';
      this.taskResize = '';
      this.featureResize = '';
      this.featureDescriptionResize = '';
      console.log(this.featureResize, 'el');
      this.descriptionResize = '';
      this.desktopResize = '';
    }
  }
}
