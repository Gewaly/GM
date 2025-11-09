import { Component } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent, SidebarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'

})
export class MainComponent {
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

}
