import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardData } from '../interfaces/dashboard.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardUrl = 'http://test-demo.aemenersol.com/api/dashboard';

  constructor(private http: HttpClient) {}

  getDashboardData(token: string): Observable<DashboardData> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<DashboardData>(this.dashboardUrl, { headers });
  }
}
