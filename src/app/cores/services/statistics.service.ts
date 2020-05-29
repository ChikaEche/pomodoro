import { Injectable } from '@angular/core';
import { TimeTrackerService } from './time-tracker.service';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  statPropagation$ = new Subject<number[]>();

  constructor(private readonly timeTrackerService: TimeTrackerService) {
    this.timeTrackerService.statistics$
      .pipe(
        tap((statistics: number[]) => this.statPropagation$.next(statistics))
      )
      .subscribe({ error: (err) => console.log('error occured') });
  }
  sessionCount = this.timeTrackerService.sessionCount;
  breakCount = this.timeTrackerService.breakCount;
}
