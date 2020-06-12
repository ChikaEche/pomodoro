import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    const storage = window.localStorage.getItem('email');
  }

  ngOnDestroy() {}
}
