import { Component, OnInit } from '@angular/core';
import { AuthService } from '../todo.auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(private todoAuth: AuthService, private router: Router, private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: ['', Validators.email],
      Password: ['']
    })
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('Email')?.value;
      const password = this.loginForm.get('Password')?.value;

       // Call the authentication service's login method
       if (this.todoAuth.login(email, password)) {
        // Navigate to the ProductListComponent upon successful login
        this.router.navigate(['/list']);
      } else {
        // Handle authentication error (show error message, etc.)
      }

    }
  }
}

  


