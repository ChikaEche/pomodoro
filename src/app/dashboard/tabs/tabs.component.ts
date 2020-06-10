import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const storage = window.localStorage.getItem('email');
    console.log(storage);
  }
}
