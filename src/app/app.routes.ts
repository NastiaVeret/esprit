import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AppComponent } from './app.component';
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  { path: '', redirectTo: "home", pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'MainPage', component: MainPageComponent }
];
