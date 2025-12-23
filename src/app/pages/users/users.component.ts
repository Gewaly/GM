import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserResponse } from '../../core/interfaces/user-response';
import { CardModule } from "primeng/card";
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [CardModule, Button, CommonModule,
    AvatarModule,
    ButtonModule, SkeletonModule],
})
export class UsersComponent implements OnInit {
  users!: UserResponse[];
  loading: boolean = true;
  constructor(private _AuthService: AuthService, private router: Router) { }


  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.loading = true;
    this._AuthService.getUsers().subscribe({
      next: (res: any) => {
        this.users = res.users;
        this.loading = false;
        console.log(this.users);
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    })
  }
  onDetail(id: number) {
    this.router.navigate(['/userDetails', id]);

  }


}
