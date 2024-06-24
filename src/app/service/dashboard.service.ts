
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardUrl = 'http://test-demo.aemenersol.com/api/dashboard';

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any> {
    return this.http.get<any>(this.dashboardUrl);
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class DashboardService {
// //   // private apiUrl = 'http://test-demo.aemenersol.com/api/dashboard';

// //   constructor(private http: HttpClient, private authService: AuthService) {}

// //   getDashboardData(): Observable<any> {
// //     console.log ('Dashboard')
// //     const token = this.authService.getToken();
// //     console.log('Token', token);
// //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
// //     return this.http.get('', { headers });  // API URL is currently empty
// //   }
// }
