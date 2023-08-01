import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/game/game.component').then((c) => c.GameComponent)
  },
  { path: '**', redirectTo: '' },
];
