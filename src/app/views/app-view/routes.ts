import { Route } from '@angular/router';
import { AppViewComponent } from './app-view.component';

export default [
    {
      path: '',
      component: AppViewComponent,
      children: [
        {
          path: '',
          loadComponent: () => import('./views/home/home.component').then((c) => c.HomeComponent)
        },
        {
          path: 'token-details/:tokenName',
          loadComponent: () => import('./views/token-details/token-details.component').then((c) => c.TokenDetailsComponent),
        },
        {
          path: 'news',
          loadComponent: () => import('./views/news/news.component').then((c) => c.NewsComponent),
        },
        {
          path: 'favourites',
          loadComponent: () => import('./views/favourite-tokens/favourite-tokens.component').then((c) => c.FavouriteTokensComponent),
        },
        {
          path: 'wallet',
          loadComponent: () => import('./views/wallet/wallet.component').then((c) => c.WalletComponent),
        },
      ],
    },
    { path: '**', redirectTo: '' },
  ] as Route[];