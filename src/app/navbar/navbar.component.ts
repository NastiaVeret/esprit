import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  navbarClass: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/home' || event.url === '/tips' || event.url === '/') {
          this.navbarClass = 'navbar-home';
        } else if (event.url === '/MainPage') {
          this.navbarClass = 'navbar-main';
        } else {
          this.navbarClass = ''; 
        }
      }
    });
  }
}
