import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { Dashboard } from './dashboard.component';

import { OverallChart } from './chartTabs/overall/lineChart/lineChart.component';
import { StoredChart } from './chartTabs/stored/lineChart/lineChart.component';
import { NetworkChart } from './chartTabs/network/lineChart/lineChart.component';
import { ConsumptionChart } from './chartTabs/consumption/lineChart/lineChart.component';
import { PhotovoltaicChart } from './chartTabs/photovoltaic/lineChart/lineChart.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      { path: '', redirectTo: 'overall', pathMatch: 'full' },
      { path: 'overall', component: OverallChart },
      { path: 'stored', component: StoredChart },
      { path: 'network', component: NetworkChart },
      { path: 'consumption', component: ConsumptionChart },
      { path: 'photovoltaic', component: PhotovoltaicChart }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
