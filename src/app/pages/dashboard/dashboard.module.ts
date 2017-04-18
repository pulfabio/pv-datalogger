import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

//import { MomentModule } from 'angular2-moment';

// Loading/Busy indicator
import {BusyModule} from 'angular2-busy';

import { routing }       from './dashboard.routing';

import { StoredChart } from './chartTabs/stored/lineChart';
import { OverallChart } from './chartTabs/overall/lineChart';
import { ConsumptionChart } from './chartTabs/consumption/lineChart';
import { NetworkChart } from './chartTabs/network/lineChart';
import { PhotovoltaicChart } from './chartTabs/photovoltaic/lineChart';

import { ChartTabsService } from './chartTabs/chartTabs.service';
import { WeatherService } from './weather/weather.service';
import { NotificationsService } from './notifications/notifications.service';
import { PieChartService } from './pieChart/pieChart.service';

import { Dashboard } from './dashboard.component';
import { Weather } from './weather/weather.component';
import { Notifications } from './notifications/notifications.component';
import { PieChart } from './pieChart';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    //MomentModule,
    BusyModule,
    routing
  ],
  declarations: [
    PieChart,
    Dashboard,
    StoredChart,
    OverallChart,
    ConsumptionChart,
    NetworkChart,
    PhotovoltaicChart,
    Weather,
    Notifications
  ],
  providers: [
    ChartTabsService,
    PieChartService,
    WeatherService,
    NotificationsService,
  ]
})
export class DashboardModule {}
