import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'home', component: AppComponent }, 
    { path: 'MainPage', component: MainPageComponent } 
];
