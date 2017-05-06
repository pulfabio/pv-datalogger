import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { Loads } from './loads.component';

import { Rules } from './loadsTabs/rules/rules.component';
import { Outlets } from './loadsTabs/outlets/outlets.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Loads,
    children: [
      { path: '', redirectTo: 'rules', pathMatch: 'full' },
      { path: 'rules', component: Rules },
      { path: 'outlets', component: Outlets },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
