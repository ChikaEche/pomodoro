import { Observable, Subject, timer } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

export class Timer {
  private countDownTimer$: Observable<number>;
  private _countDownEnd$: Subject<void>;
  private pause$: Subject<void>;
  private seconds: number;

  public get countDownEnd$() {
    return this._countDownEnd$;
  }

  public set coundDownEnd$(countDownEnd$: Subject<void>) {
    if (!this._countDownEnd$) {
      this._countDownEnd$ = countDownEnd$;
    } else {
      throw new Error('Unable to reinitialize this value');
    }
  }

  constructor(readonly secs: number) {
    this.seconds = secs;
  }

  start() {
    this.pause$ = new Subject<void>();
    this.countDownTimer$ = timer(0, 1000).pipe(
      takeUntil(this.pause$),
      tap(() => {
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
    this.countDownEnd$.next();
    this.coundDownEnd$.complete();
    this.pause$.next();
    this.pause$.complete();
  }
}
