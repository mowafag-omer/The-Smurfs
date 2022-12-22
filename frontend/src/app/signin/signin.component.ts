import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export type signinType = {
  userName: string,
  password: string,
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  signinData: signinType = {
    userName: '',
    password: ''
  }

  constructor(private auth: AuthService, private router: Router) {}

  errMessage: string | null = null

  submitHandler() {
    this.errMessage = null
    
    this.auth.loginUser(this.signinData)
      .subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token)
          this.router.navigate(['/profile'])
        } ,
        err => this.errMessage = err.error
      )

    this.signinData = {
      userName: '',
      password: ''
    }
  }
}
