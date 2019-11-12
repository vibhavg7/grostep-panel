import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _route:Router) { }

  ngOnInit() {
  }

  dashboardClick(category)
  {
    this._route.navigate([category]);
  }

}
