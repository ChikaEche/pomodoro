import { Component, OnInit } from '@angular/core';
import { BreakpointService } from 'src/app/cores/services/breakpoint.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private breakPoint: BreakpointService, private router: Router) {}
  breakpoint: Observable<boolean>;

  ngOnInit(): void {
    this.breakpoint = this.breakPoint.isPalm$;
  }
}
