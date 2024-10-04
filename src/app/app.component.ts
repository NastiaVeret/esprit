import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'espritapp';
  showMainPage = false;

  constructor(private router: Router) {}

  navigateToAnotherPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
    this.showMainPage = true; 
  }
}
