import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

// Loading/Busy indicator
import {BusyModule} from 'angular2-busy';

import { routing }       from './events.routing';

import { EventsTabsService } from './eventsTabs/eventsTabs.service';
import { NotificationsService } from './notifications/notifications.service';

import { Events } from './events.component';
import { Notifications } from './notifications/notifications.component';
import { Latest } from './eventsTabs/latestEvents/latest.component';
import { All } from './eventsTabs/allEvents/all.component';

import { DatepickerModule } from 'ngx-bootstrap/datepicker';

import { LOCALE_ID } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    BusyModule,
    //MomentModule,
    DatepickerModule.forRoot(),
    routing
  ],
  declarations: [
    Events,
    Notifications,
    Latest,
    All
  ],
  providers: [
    EventsTabsService,
    NotificationsService,
    { provide: LOCALE_ID, useValue: "it-IT" },
  ]
})
export class EventsModule {}
