import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessagesService {
  error$ = new Subject<string>();
  constructor() {}

  errorMessage(message: string) {
    this.error$.next(message);
  }
}
