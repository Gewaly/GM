import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  imports: [RouterLink],
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
