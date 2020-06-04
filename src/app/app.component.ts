import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  transition,
  query,
  style,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('* <=> *', [
        query(
          ':enter, :leave',
          [
            style({
              position: 'absolute',
              left: 0,
              width: '100%',
              opacity: 0,
              transform: 'scale(0) translateY(100%)',
            }),
          ],
          { optional: true }
        ),
        query(
          ':enter',
          [
            animate(
              '500ms ease',
              style({ opacity: 1, transform: 'scale(1) translateY(0)' })
            ),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class AppComponent {
  constructor(private readonly router: Router) {}
}
