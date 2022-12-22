import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signupType } from '../signup/signup.component';
import { signinType } from '../signin/signin.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signupUrl = "http://localhost:3000/user/register"
  private signinUrl = "http://localhost:3000/user/login"

  constructor(private http: HttpClient) { }

  registerUser(user: signupType) {
    return this.http.post(this.signupUrl, user)
  }

  loginUser(user: signinType) {
    return this.http.post(this.signinUrl, user)
  }
}
