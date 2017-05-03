import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { Events } from './events.component';

import { Latest } from './eventsTabs/latest/latest.component';
import { All } from './eventsTabs/all/all.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Events,
    children: [
      { path: '', redirectTo: 'latest', pathMatch: 'full' },
      { path: 'latest', component: Latest },
      { path: 'all', component: All },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
