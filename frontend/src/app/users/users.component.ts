import { Component, DoCheck, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { FriendshipService } from '../services/friendship.service';
import { UserService } from '../services/user.service';

export type userType = {
  _id: string;
  userName: string;
  role: string;
  added?: boolean;
  isFriend?: boolean;
  isRequest?: boolean;
};

export type friendshipsType = {
  _id: object;
  firstUser: string;
  secondUser: string;
  status: string;
  date: Date;
};

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, DoCheck {
  token = localStorage.getItem('token') || '';
  user: { _id: string; userName: string; role: string } = this.token
    ? jwt_decode(this.token)
    : { _id: '', userName: '', role: '' };
  users: userType[] = [];
  friendships: friendshipsType[] = [];

  constructor(
    private userService: UserService,
    private friendshipService: FriendshipService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getFriendships();
  }

  ngDoCheck() {
    console.log('DO CHECK');
    this.getAddedFriend(this.users, this.friendships);
    console.log(this.users);
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

  addFriend(secondUser: string) {
    this.friendshipService
      .sendFriendReq({
        firstUser: this.user._id,
        secondUser,
      })
      .subscribe(
        (res: any) => {
          this.friendships = !!this.friendships
            ? [...this.friendships, res.payload]
            : [res.payload];
        },
        (err) => console.log(err)
      );
  }

  getAddedFriend(users: userType[], friendsList: friendshipsType[]) {
    if (!!users && !!friendsList) {
      users.forEach((user: any, index: number) => {
        friendsList.forEach((friend: any) => {
          user._id == friend.secondUser && (user.added = true)
        });
      });
    }
  }
}

