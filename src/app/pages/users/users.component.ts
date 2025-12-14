import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserResponse } from '../../core/interfaces/user-response';
import { CardModule } from "primeng/card";
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [CardModule, Button, CommonModule],
})
export class UsersComponent implements OnInit {
  users!: UserResponse[];
  constructor(private _AuthService: AuthService) { }


  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this._AuthService.getUsers().subscribe({
      next: (res: any) => {
        this.users = res.users;
        console.log(this.users);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
