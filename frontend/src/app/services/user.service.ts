import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token = localStorage.getItem('token')
  private usersUrl = "http://localhost:3000/user/getAllUsers"
  private modifyUrl = "http://localhost:3000/user/modify"
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.usersUrl)
  }
  
  modifyRole(userData: { _id: string, role: string }) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.put(this.modifyUrl, userData, { headers: headers })
  }
}
