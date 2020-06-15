import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeTrackerService } from 'src/app/core/services/time-tracker.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { StatisticsDisplayService } from 'src/app/core/services/statistics-display.service';
import { SessionUpdateService } from 'src/app/core/services/session-update.service';
import { UserTask } from 'src/app/shared/interfaces/user-task';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  userTasks;
  taskExistence = 'No-task-yet!';
  barChartSmall = '';
  barChartNormal = 'bar-chart__container';
  lineChartSmall = '';
  lineChartNormal = 'line-chart__container';
  doughnutSmall = '';
  doughnutNormal = 'doughnut-chart__container';
  breakPointObserver: boolean;
  userSession;
  taskChartData = [];
  taskChartLabel = [];
  destroy$ = new Subject<void>();

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

  barChartLabels = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [
    {
      data: [],
      label: 'weekly session statistics',
    },
  ];

  lineChartData = [
    {
      data: [],
      label: 'Monthly session statistics',
    },
  ];
  lineChartType = 'line';
  lineChartLegend = true;
  lineChartLabels = [];
  lineChartOptions = {
    responsive: true,
  };

  dougnnutChartData = [
    {
      data: [],
      label: 'Top 10 tasks',
    },
  ];
  doughnutChartLabels = [];
  dougnnutChartLegend = true;
  dougnnutChartType = 'doughnut';
  dougnnutChartOptions = {
    responsive: true,
  };

  constructor(
    private readonly statisticsDisplayService: StatisticsDisplayService,
    private readonly sessionUpdateService: SessionUpdateService,
    private readonly breakPointService: BreakpointService
  ) {}

  ngOnInit() {
    this.breakPointService.isPalm$
      .pipe(
        takeUntil(this.destroy$),
        tap((breakpoint) => {
          this.breakPointObserver = breakpoint;
          this.onBreakPoint();
        })
      )
      .subscribe({ error: (err) => console.log('error in breakpoint, err') });

    this.statisticsDisplayService.tasks$
      .pipe(
        takeUntil(this.destroy$),
        tap((tasks) => {
          if (tasks) {
            this.userTasks = tasks;
            this.getUserTasks();
            this.taskExistence = '';
          } else {
            this.taskExistence = 'No-task-yet!';
          }
        })
      )
      .subscribe({ error: (err) => console.log('cannot get tasks', err) });

    this.sessionUpdateService.session$
      .pipe(
        takeUntil(this.destroy$),
        tap((sessions) => {
          this.userSession = sessions;
          this.getWeeklySessionData();
          this.getMontlySessionData();
        })
      )
      .subscribe({ error: (err) => console.log('cannot get sessions', err) });
  }

  onBreakPoint() {
    if (this.breakPointObserver) {
      this.barChartSmall = 'small-screen';
      this.barChartNormal = '';
      this.lineChartSmall = 'small-screen';
      this.lineChartNormal = '';
      this.doughnutSmall = 'small-screen';
      this.doughnutNormal = '';
    } else {
      this.barChartSmall = '';
      this.barChartNormal = 'bar-chart__container';
      this.lineChartSmall = '';
      this.lineChartNormal = 'line-chart__container';
      this.doughnutSmall = '';
      this.doughnutNormal = 'doughnut-chart__container';
    }
  }

  getWeeklySessionData() {
    const weeklySessionLabel = Object.keys(this.userSession.weeklySession);
    this.barChartLabels = [...weeklySessionLabel];
    let weeklySessionData = Object.values(this.userSession.weeklySession);
    weeklySessionData = weeklySessionData.map((eachData: number) =>
      Math.round(eachData / 2)
    );
    this.barChartData[0].data = [...weeklySessionData];
  }

  getMontlySessionData() {
    const monthlySessionLabel = Object.keys(this.userSession.monthlySession);
    this.lineChartLabels = [...monthlySessionLabel];
    let monthlySessionData = Object.values(this.userSession.monthlySession);
    monthlySessionData = monthlySessionData.map((eachData: number) =>
      Math.round(eachData / 2)
    );
    this.lineChartData[0].data = [...monthlySessionData];
  }

  getUserTasks() {
    const tasks: UserTask[] = Object.values(this.userTasks);
    tasks.forEach((num, index) => {
      if (typeof num === 'string') {
        tasks.splice(index, 1);
      }
    });
    if (tasks.length > 20) {
      tasks.slice(0, 19);
    }
    tasks.sort((a, b) => b.sessionsCompleted - a.sessionsCompleted);
    tasks.map((eachTask) => {
      this.taskChartLabel.push(eachTask.task);
      eachTask.sessionsCompleted = Math.round(eachTask.sessionsCompleted / 2);
      this.taskChartData.push(eachTask.sessionsCompleted);
    });
    this.doughnutChartLabels = this.taskChartLabel;
    this.dougnnutChartData = [
      { data: this.taskChartData, label: 'Top 10 tasks' },
    ];

    this.taskChartData = [];
    this.taskChartLabel = [];
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
