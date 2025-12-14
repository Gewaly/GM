import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  constructor() { }
  fb = inject(FormBuilder);

  ngOnInit() {
  }
  loginForm = this.fb.group({
    Username: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  })
}
