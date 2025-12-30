import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Important for ngClass and others if used

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class SettingsComponent implements OnInit {
  isDarkTheme: boolean = false;

  constructor() { }

  ngOnInit() {
    // Initialize theme state from local storage
    const theme = localStorage.getItem('theme');
    this.isDarkTheme = theme === 'dark';
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const body = document.body;

    if (this.isDarkTheme) {
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}
