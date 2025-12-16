import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userDetails',
  templateUrl: './userDetails.component.html',
  styleUrls: ['./userDetails.component.css'],
  standalone: true,
  imports: [
    CommonModule,

  ]
})
export class UserDetailsComponent implements OnInit {
  userId!: number;
  user: any;


  constructor(private _AuthService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUserDetails();
  }
  loadUserDetails() {
    this._AuthService.getSingleUser(this.userId).subscribe({
      next: (res: any) => {
        this.user = res;
        console.log(this.user);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  goBack() {
    history.back();
  }

}
