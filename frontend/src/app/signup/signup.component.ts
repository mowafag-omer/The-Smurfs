import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export type signupType = {
  userName: string,
  password: string,
  role: string
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupData: signupType = {
    userName: '',
    password: '',
    role: ''
  }

  successMessage: string | null = null
  errMessage: string | null = null

  constructor(private auth: AuthService, private router: Router) {}

  submitHandler() {
    this.errMessage = null
    
    this.auth.registerUser(this.signupData)
      .subscribe(
        res => {
          this.successMessage = 'User registered successfully !'
          setInterval(() => this.router.navigate(['/signin']), 2000);
        } ,
        err => this.errMessage = err.error
      )

    this.signupData = {
      userName: '',
      password: '',
      role: ''
    }
  }
}
