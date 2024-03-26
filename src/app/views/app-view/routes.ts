import { Route } from '@angular/router';
import { AppViewComponent } from './app-view.component';

export default [
    {
      path: '',
      component: AppViewComponent,
      children: [
        // {
        //   path: '',
        //   loadComponent: () => import('./views/home/login-page.component').then((c) => c.LoginPageComponent)
        // },
        // {
        //   path: 'register',
        //   loadComponent: () =>
        //     import('./views/register-page/register-page.component').then((c) => c.RegisterPageComponent),
        // },
        
      ],
    },
    { path: '**', redirectTo: '' },
  ] as Route[];