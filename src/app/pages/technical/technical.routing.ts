import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { Technical } from './technical.component';

import { Summary } from './technicalTabs/summary/summary.component';
import { Detail } from './technicalTabs/detail/detail.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Technical,
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', component: Summary },
      { path: 'detail', component: Detail },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
