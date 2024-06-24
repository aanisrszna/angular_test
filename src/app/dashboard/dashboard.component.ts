import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardData, User } from '../interfaces/dashboard.interface';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, PlotlyModule, NgFor]
})
export class DashboardComponent implements OnInit {
  dashboardData: DashboardData | null = null;
  errorMessage: string | null = null;
  userList: User[] = [];
  donutChartData: any;
  donutChartLayout: any;
  barChartData: any;
  barChartLayout: any;
  private dashboardUrl = 'http://test-demo.aemenersol.com/api/dashboard';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get<DashboardData>(this.dashboardUrl, { headers }).subscribe(
        data => {
          this.dashboardData = data;
          console.log('Dashboard data:', data);  // Log the data to the console

          // Populate the user list and chart data
          this.userList = data.tableUsers;
          this.setupCharts(data);
        },
        error => {
          console.error('Error fetching dashboard data', error);
          this.errorMessage = 'Failed to load dashboard data';
        }
      );
    } else {
      this.errorMessage = 'No authentication token found';
      console.error('No authentication token found');
    }
  }

  setupCharts(data: DashboardData): void {
    // Setup your donut chart data and layout
    this.donutChartData = [{
      values: data.chartDonut.map(item => item.value),
      labels: data.chartDonut.map(item => item.name),
      type: 'pie',
      hole: .4
    }];
    this.donutChartLayout = {
      title: 'Donut Chart'
    };

    // Setup your bar chart data and layout
    this.barChartData = [{
      x: data.chartBar.map(item => item.name),
      y: data.chartBar.map(item => item.value),
      type: 'bar'
    }];
    this.barChartLayout = {
      title: 'Bar Chart'
    };
  }

  signOut(): void {
    localStorage.removeItem('token');
    // Navigate to sign-in or home page
  }
}
