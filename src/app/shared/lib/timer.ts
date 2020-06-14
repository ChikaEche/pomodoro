import { Observable, Subject, timer, BehaviorSubject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

export class Timer {
  private countDownTimer$: Observable<number>;
  countDownEnd$ = new Subject();
  private pause$: Subject<void>;
  public seconds: number;
  remainingSeconds$ = new BehaviorSubject(0);

  constructor() {}

  start() {
    this.pause$ = new Subject<void>();
    this.countDownTimer$ = timer(1000, 1000).pipe(
      takeUntil(this.pause$),
      tap(() => {
        if (this.seconds === 0) {
          this.stop();
        } else {
          this.seconds = this.seconds - 1;
          this.remainingSeconds$.next(this.seconds);
        }
      })
    );
    this.countDownTimer$.subscribe({ error: (err) => console.log(err) });
  }

  pause() {
    if (this.pause$) {
      this.pause$.next();
      this.pause$.complete();
    }
  }

  stop() {
    this.pause$.next();
    this.pause$.complete();
    this.countDownEnd$.next();
  }

  onDestroy() {
    if (this.pause$) {
      this.pause$.next();
      this.pause$.complete();
    }
  }
}
