import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist';
import { DashboardService } from '../service/dashboard.service';
import { DashboardData, User } from '../interfaces/dashboard.interface';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, PlotlyModule]
})
export class DashboardComponent implements OnInit {
  dashboardData: DashboardData | null = null;
  errorMessage: string | null = null;
  userList: User[] = [];
  donutChartData: any;
  donutChartLayout: any;
  barChartData: any;
  barChartLayout: any;

  constructor(private dashboardService: DashboardService, private router: Router) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.dashboardService.getDashboardData(token).subscribe(
        data => {
          this.dashboardData = data;
          this.userList = data.tableUsers;
          this.setupCharts(data);
        },
        error => {
          console.error('Error fetching dashboard data', error);
          if (error.status === 401 || error.status === 403) {
            this.errorMessage = 'Invalid token. Please sign in again.';
            console.log('Error Message:', this.errorMessage); 
            localStorage.removeItem('token'); 
            this.router.navigate(['/sign-in'], { queryParams: { error: this.errorMessage } }); 
          }
        }
      );
    } else {
      this.errorMessage = 'No authentication token found';
      console.log('Error Message:', this.errorMessage); 
      console.error('No authentication token found');
      this.router.navigate(['/sign-in'], { queryParams: { error: this.errorMessage } }); 
    }
  }

  setupCharts(data: DashboardData): void {
    this.donutChartData = [{
      values: data.chartDonut.map(item => item.value),
      labels: data.chartDonut.map(item => item.name),
      type: 'pie',
      hole: .4,
      marker: {
        colors: ['#9e9e9e', '#aeaeae', '#bebebe', '#cdcdcd']
      }
    }];
    this.donutChartLayout = {
      title: '',
      showlegend: true
    };

    this.barChartData = [{
      x: data.chartBar.map(item => item.name),
      y: data.chartBar.map(item => item.value),
      type: 'bar',
      marker: {
        color: '#9e9e9e'
      }
    }];
    this.barChartLayout = {
      title: ''
    };
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }
}
