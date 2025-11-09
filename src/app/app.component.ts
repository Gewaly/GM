import { Component } from '@angular/core';
import { MainComponent } from "./core/layouts/main/main.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'devExpress';
}
