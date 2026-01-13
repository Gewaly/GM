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
        path: 'userDetails/:id',
        loadComponent: () =>
          import('./pages/userDetails/userDetails.component').then((m) => m.UserDetailsComponent),

      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.component').then((m) => m.SettingsComponent),
      },
      {

        path: 'profile',
        loadComponent: () =>
          import('../app/shared/components/profile/profile.component').then((m) => m.ProfileComponent),
      },
      {

        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'drag',
        loadComponent: () =>
          import('./pages/drag/drag.component').then((m) => m.DragComponent),
      },

    ]
  },
  {

    path: 'login',
    loadComponent: () =>
      import('../app/shared/components/login/login.component').then((m) => m.LoginComponent),
  },
  {

    path: 'signup',
    loadComponent: () =>
      import('../app/shared/components/sign-up/sign-up.component').then((m) => m.SignUpComponent),
  },

  {
    path: '**',
    loadComponent: () =>
      import('./pages/error/error.component').then((m) => m.ErrorComponent),
  },
];
