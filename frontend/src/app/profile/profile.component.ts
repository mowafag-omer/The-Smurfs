import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  token = localStorage.getItem('token') || '';
  modifyRole: boolean = false;
  user: { _id: string; userName: string; role: string } = this.token
    ? jwt_decode(this.token)
    : { _id: '', userName: '', role: '' };

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  showModifyRole() {
    this.modifyRole = true;
  }

  modifyRoleHandler() {
    this.userService
      .modifyRole({ _id: this.user._id, role: this.user.role })
      .subscribe(
        (res) => (this.modifyRole = false),
        (err) => console.log(err)
      );
  }
}
