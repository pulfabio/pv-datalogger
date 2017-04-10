import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

//import { MomentModule } from 'angular2-moment';

import { routing }       from './dashboard.routing';

import { PopularApp } from './popularApp';
import { PieChart } from './pieChart';
import { TrafficChart } from './trafficChart';
import { UsersMap } from './usersMap';

import { StoredChart } from './chartTabs/stored/lineChart';
import { OverallChart } from './chartTabs/overall/lineChart';
import { ConsumptionChart } from './chartTabs/consumption/lineChart';
import { NetworkChart } from './chartTabs/network/lineChart';
import { PhotovoltaicChart } from './chartTabs/photovoltaic/lineChart';

import { Feed } from './feed';
import { Todo } from './todo';
import { Calendar } from './calendar';
import { CalendarService } from './calendar/calendar.service';
import { FeedService } from './feed/feed.service';

import { ChartTabsService } from './chartTabs/chartTabs.service';
import { WeatherService } from './weather/weather.service';
import { NotificationsService } from './notifications/notifications.service';

import { PieChartService } from './pieChart/pieChart.service';
import { TodoService } from './todo/todo.service';
import { TrafficChartService } from './trafficChart/trafficChart.service';
import { UsersMapService } from './usersMap/usersMap.service';

import { ChartistJs } from './chartistJs/chartistJs.component';
import { ChartistJsService } from './chartistJs/chartistJs.service';

import { Dashboard } from './dashboard.component';
import { Weather } from './weather/weather.component';
import { Notifications } from './notifications/notifications.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    //MomentModule,
    routing
  ],
  declarations: [
    PopularApp,
    PieChart,
    TrafficChart,
    UsersMap,
    Feed,
    Todo,
    Calendar,
    ChartistJs,
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
    CalendarService,
    FeedService,
    ChartTabsService,
    PieChartService,
    WeatherService,
    NotificationsService,
    TodoService,
    TrafficChartService,
    UsersMapService,
    ChartistJsService
  ]
})
export class DashboardModule {}
