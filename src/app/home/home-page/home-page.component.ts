import { Component, OnInit } from '@angular/core';
import { BreakpointService } from 'src/app/cores/services/breakpoint.service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private breakPoint: BreakpointService) {}
  breakpoint: Observable<boolean>;

  resizeNormal = 'resize-normal';
  resizeSmall = '';
  isSmall = false;
  featureDescription = 'feature-desc';
  feature = 'feature';
  small = 'small';

  ngOnInit(): void {
    this.breakpoint = this.breakPoint.isPalm$;
    this.breakpoint
      .pipe(
        map((x) => {
          console.log(x);
          this.isSmall = x;
          this.screenResize();
        })
      )
      .subscribe();
  }

  screenResize() {
    console.log('en');
    if (this.isSmall) {
      console.log('tr');
      this.resizeNormal = '';
      this.resizeSmall = 'resize-small';
      this.small = '';
      console.log(this.resizeSmall);
    } else {
      console.log('el');
      this.small = '';
      this.resizeNormal = 'resize-normal';
      this.resizeSmall = 'small';
    }
  }
}
