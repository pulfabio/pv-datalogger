import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule' },
      { path: 'balance', loadChildren: 'app/pages/balance/balance.module#BalanceModule' },
      { path: 'history', loadChildren: 'app/pages/history/history.module#HistoryModule' },
      { path: 'technical', loadChildren: 'app/pages/technical/technical.module#TechnicalModule' },
      { path: 'events', loadChildren: 'app/pages/events/events.module#EventsModule' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
