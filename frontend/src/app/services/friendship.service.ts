import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {
  token = localStorage.getItem('token')
  private getFriendsUrl = "http://localhost:3000/friendship/getFriendships/"
  private friendReqUrl = "http://localhost:3000/friendship/sendFriendRequest"
  private acceptReqUrl = "http://localhost:3000/friendship/acceptRequest"
  private unfriendUrl = "http://localhost:3000/friendship/unfriend"
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${this.token}`
  })

  constructor(private http: HttpClient) { }

  getFriendships(id: string) {
    return this.http.get(`${this.getFriendsUrl}?id=${id}`)
  } 
  
  sendFriendReq(usersData: { firstUser: string, secondUser: string }) {
    return this.http.post(this.friendReqUrl, usersData, { headers: this.headers })
  }

  acceptRequest(data: { firstUser: string, secondUser: string }) {
    return this.http.put(this.acceptReqUrl, data, { headers: this.headers })
  }

  unfriend(data: { firstUser: string, secondUser: string }) {
    return this.http.post(this.unfriendUrl, data, { headers: this.headers })
  }

}
