import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './core/layouts/main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/users/users.component').then((m) => m.UsersComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.component').then((m) => m.SettingsComponent),
      },
    ]
  },
  {

    path: 'login',
    loadComponent: () =>
      import('../app/shared/components/login/login.component').then((m) => m.LoginComponent),

  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/error/error.component').then((m) => m.ErrorComponent),
  },
];
