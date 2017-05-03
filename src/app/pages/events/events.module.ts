import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

// Loading/Busy indicator
import {BusyModule} from 'angular2-busy';

import { routing }       from './events.routing';

import { EventsTabsService } from '../eventsTabs/eventsTabs.service';

import { Events } from './events.component';

import { Latest } from './eventsTabs/latest/latest.component';
import { All } from './eventsTabs/all/all.component';

import { DatepickerModule } from 'ng2-bootstrap/datepicker';

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
    Latest,
    All
  ],
  providers: [
    EventsService,
    { provide: LOCALE_ID, useValue: "it-IT" },
  ]
})
export class EventsModule {}
