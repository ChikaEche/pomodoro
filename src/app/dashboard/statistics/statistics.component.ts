import { Component, OnInit } from '@angular/core';
import { TimeTrackerService } from 'src/app/cores/services/time-tracker.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  constructor(private timeTrackerService: TimeTrackerService) {}

  ngOnInit(): void {}
}
