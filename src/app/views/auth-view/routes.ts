import { Route } from '@angular/router';
import { AuthViewComponent } from './auth-view.component';

export default [
    {
      path: '',
      component: AuthViewComponent,
      children: [
        {
          path: '',
          loadComponent: () => import('./views/login-page/login-page.component').then((c) => c.LoginPageComponent)
        },
        {
          path: 'register',
          loadComponent: () =>
            import('./views/register-page/register-page.component').then((c) => c.RegisterPageComponent),
        },
        
      ],
    },
    { path: '**', redirectTo: '' },
  ] as Route[];