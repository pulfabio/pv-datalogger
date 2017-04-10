import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { History } from './history.component';

import { Summary } from './historyTabs/summary/summary.component';
import { Detail } from './historyTabs/detail/detail.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: History,
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', component: Summary },
      { path: 'detail', component: Detail },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
