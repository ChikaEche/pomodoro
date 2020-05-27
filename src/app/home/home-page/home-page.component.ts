import { Component, OnInit } from '@angular/core';
import { BreakpointService } from 'src/app/cores/services/breakpoint.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private breakPoint: BreakpointService) {}
  breakpoint: Observable<any>;

  ngOnInit(): void {
    this.breakpoint = this.breakPoint.isPalm$;
  }
}
