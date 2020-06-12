import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeTrackerService } from 'src/app/core/services/time-tracker.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { StatisticsDisplayService } from 'src/app/core/services/statistics-display.service';
import { SessionUpdateService } from 'src/app/core/services/session-update.service';
import { UserTask } from 'src/app/shared/interfaces/user-task';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  userTasks;
  userSession;
  taskChartData = [];
  taskChartLabel = [];
  destroy$ = new Subject<void>();
  sessionCount = this.timeTrackerService.sessionCount;
  breakCount = this.timeTrackerService.breakCount;
  constructor(
    private readonly timeTrackerService: TimeTrackerService,
    private readonly statisticsDisplayService: StatisticsDisplayService,
    private readonly sessionUpdateService: SessionUpdateService
  ) {}

  ngOnInit() {
    this.statisticsDisplayService.tasks$
      .pipe(
        takeUntil(this.destroy$),
        tap((tasks) => {
          this.userTasks = tasks;
          this.getUserTasks();
          console.log(tasks);
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

  getWeeklySessionData() {
    const weeklySessionLabel = Object.keys(this.userSession.weeklySession);
    this.barChartLabels = [...weeklySessionLabel];
    const weeklySessionData = Object.values(this.userSession.weeklySession);
    this.barChartData[0].data = [...weeklySessionData];
  }

  getMontlySessionData() {
    const monthlySessionLabel = Object.keys(this.userSession.monthlySession);
    this.lineChartLabels = [...monthlySessionLabel];
    const monthlySessionData = Object.values(this.userSession.monthlySession);
    this.lineChartData[0].data = [...monthlySessionData];
  }

  getUserTasks() {
    const tasks: UserTask[] = Object.values(this.userTasks);
    if (tasks.length > 10) {
      tasks.slice(0, 9);
    }
    tasks.sort((a, b) => b.sessionsCompleted - a.sessionsCompleted);
    tasks.map((eachTask) => {
      this.taskChartLabel.push(eachTask.task);
      this.taskChartData.push(eachTask.sessionsCompleted);
    });
    this.doughnutChartLabels = [...this.taskChartLabel];
    this.dougnnutChartData = [
      { data: [...this.taskChartData], label: 'Top 10 tasks' },
    ];
    console.log(
      this.taskChartData,
      this.taskChartLabel,
      this.doughnutChartLabels,
      this.dougnnutChartData[0].data
    );
  }

  // tslint:disable-next-line: member-ordering
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
