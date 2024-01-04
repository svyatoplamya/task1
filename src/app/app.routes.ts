import { Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';

export const routes: Routes = [
  { path: '', component: AppNavComponent },
  { path: 'users', component: UsersListComponent },
  { path: '**', redirectTo: '' },
];
