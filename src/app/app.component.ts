import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule, NavbarComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
