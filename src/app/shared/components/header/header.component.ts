import { NgClass } from '@angular/common';
import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [RouterLink, NgClass],
})
export class HeaderComponent implements OnInit {
  isDarkTheme: boolean = false;
  @Output() menuToggle = new EventEmitter<void>();


  constructor() { }


  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      this.isDarkTheme = true;
    }
  }

  toggleTheme() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    this.isDarkTheme = isDark;
  }

}
