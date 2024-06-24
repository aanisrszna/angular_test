import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class SignInComponent {
  signInForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signInForm.invalid) {
      return;
    }

    const credentials = this.signInForm.value;

    this.http.post('http://test-demo.aemenersol.com/api/account/login', credentials)
      .subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          localStorage.setItem('token', response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid username or password';
        }
      );
  }
}


