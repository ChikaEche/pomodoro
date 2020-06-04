import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointService } from '../cores/services/breakpoint.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  breakPoint$: Observable<boolean>;

  constructor(private breakPointService: BreakpointService) {
    this.breakPoint$ = this.breakPointService.isPalm$;
  }

  ngOnInit(): void {}
}
