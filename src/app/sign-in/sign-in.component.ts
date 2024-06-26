import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.signInForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['error']) {
        this.errorMessage = params['error'];
        console.log('Error Message from Query Params:', this.errorMessage); 
      }
    });
  }

  onSubmit() {
    if (this.signInForm.invalid) {
      return;
    }

    const credentials = this.signInForm.value;

    this.authService.login(credentials.username, credentials.password)
      .subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          this.authService.saveToken(response); 
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Login failed:', error);
          if (error.status === 401) {
            this.errorMessage = 'Invalid username or password';
          } else if (error.status === 403) {
            this.errorMessage = 'Token has expired or is invalid';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
          console.log('Error Message:', this.errorMessage); 
        }
      );
  }
}
