import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { Balance } from './balance.component';

import { Daily } from './balanceTabs/daily/daily.component';
import { Monthly } from './balanceTabs/monthly/monthly.component';
import { Annual } from './balanceTabs/annual/annual.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Balance,
    children: [
      { path: '', redirectTo: 'daily', pathMatch: 'full' },
      { path: 'daily', component: Daily },
      { path: 'monthly', component: Monthly },
      { path: 'annual', component: Annual }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
