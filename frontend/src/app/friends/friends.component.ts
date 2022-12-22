import { Component, DoCheck, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { FriendshipService } from '../services/friendship.service';
import { UserService } from '../services/user.service';
import { friendshipsType, userType } from '../users/users.component';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit, DoCheck {
  token = localStorage.getItem('token') || '';
  user: { _id: string; userName: string; role: string } = this.token
    ? jwt_decode(this.token)
    : { _id: '', userName: '', role: '' };
  users: userType[] = [];
  friends: userType[] = [];
  friendships: friendshipsType[] = [];

  constructor(
    private userService: UserService,
    private friendshipService: FriendshipService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getFriendships();
  }

  ngDoCheck(): void {
    this.getUserFriends(this.users, this.friendships);
    this.getFriendReqs(this.users, this.friendships);
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (res: any) =>
        (this.users = res.filter((smurf: any) => smurf._id !== this.user._id)),
      (err) => console.log(err)
    );
  }

  getFriendships() {
    this.friendshipService.getFriendships(this.user._id).subscribe(
      (res: any) => (this.friendships = res?.payload),
      (err) => console.log(err)
    );
  }

  acceptRequest(id: string) {
    this.friendshipService.acceptRequest({firstUser: id, secondUser: this.user._id}).subscribe(
      (res: any) => this.getFriendships(),
      (err) => console.log(err)
    )
  }

  unfriend(secondUser: string ) {
    this.friendshipService.unfriend({firstUser: this.user._id, secondUser}).subscribe(
      (res: any) => this.getFriendships(),
      (err) => console.log(err)
    )
  }

  getUserFriends(users: userType[], friendsList: friendshipsType[]) {
    if (!!users && !!friendsList) {
      users.forEach((smurf: any) => {
        friendsList.forEach((friend: any) => {
          if (
            friend.status == 'accepted' &&
            (smurf._id == friend.firstUser || smurf._id == friend.secondUser)
          )
            smurf.isFriend = true;
            smurf.friendshipId = friend._id
        });
      });
    }
  }

  getFriendReqs(users: userType[], friendsList: friendshipsType[]) {
    if (!!users && !!friendsList) {
      users.forEach((smurf: any) => {
        friendsList.forEach((friend: any) => {
          if (friend.status == 'requested' && smurf._id == friend.firstUser)
            smurf.isRequest = true;
        });
      });
    }
  }
}
