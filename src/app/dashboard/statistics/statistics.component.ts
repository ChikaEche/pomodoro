import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/cores/services/statistics.service';
import { map, min } from 'rxjs/operators';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  constructor(private readonly statisticsService: StatisticsService) {}
  sessionCount = this.statisticsService.sessionCount;
  breakCount = this.statisticsService.breakCount;
  ngOnInit() {
    this.statisticsService.statPropagation$
      .pipe(
        map((statistics) => {
          this.breakCount = statistics[1];
          this.sessionCount = statistics[0];
          this.barChartData[0].data = [statistics[0], statistics[1]];
          console.log(statistics[1]);
        })
      )
      .subscribe();
  }

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
    },
  ];
}
