import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeTrackerService } from 'src/app/cores/services/time-tracker.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  constructor(private readonly timeTrackerService: TimeTrackerService) {}
  destroy$ = new Subject<void>();
  sessionCount = this.timeTrackerService.sessionCount;
  breakCount = this.timeTrackerService.breakCount;

  barChartOptions = {
    scaleVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
          },
        },
      ],
    },
  };

  barChartLabels = ['sessions', 'breaks'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [
    {
      data: [this.sessionCount, this.breakCount],
      label: 'Pomodoro Stats',
    },
  ];

  ngOnInit() {
    this.timeTrackerService.timerClass.countDownEnd$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.barChartData[0].data = [
            this.timeTrackerService.sessionCount,
            this.timeTrackerService.breakCount,
          ];
        })
      )
      .subscribe({ error: (err) => console.error('error occured') });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
