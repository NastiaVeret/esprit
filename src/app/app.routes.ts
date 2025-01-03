import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AppComponent } from './app.component';
import {HomeComponent} from "./home/home.component";
import { MedicaltipsComponent } from './medicaltips/medicaltips.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const routes: Routes = [
  { path: '', redirectTo: "home", pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'MainPage', component: MainPageComponent },
  {path: 'tips', component: MedicaltipsComponent},
  {path: 'about-us', component: AboutUsComponent}
];
