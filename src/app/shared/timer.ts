import { Observable, Subject, timer } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

export class Timer {
  private countDownTimer$: Observable<number>;
  countDownEnd$: Subject<string>;
  private pause$: Subject<void>;
  private seconds: number;

  constructor(readonly secs: number) {
    this.seconds = secs;
  }

  start() {
    this.pause$ = new Subject<void>();
    this.countDownTimer$ = timer(0, 1000).pipe(
      takeUntil(this.pause$),
      tap((time) => {
        if (this.seconds === 0) {
          stop();
        } else {
          this.seconds = this.seconds - 1;
        }
      })
    );
    this.countDownTimer$.subscribe({ error: (err) => console.log(err) });
  }

  pause() {
    this.pause$.next();
    this.pause$.complete();
  }

  stop() {
    this.countDownEnd$.next('finished');
    this.pause$.next();
    this.pause$.complete();
  }
}
