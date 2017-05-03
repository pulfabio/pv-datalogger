import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

// Loading/Busy indicator
import {BusyModule} from 'angular2-busy';

import { routing }       from './history.routing';

import { HistoryService } from './history.service';

import { History } from './history.component';

import { Summary } from './historyTabs/summary/summary.component';
import { Detail } from './historyTabs/detail/detail.component';

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
    History,
    Summary,
    Detail
  ],
  providers: [
    HistoryService,
    { provide: LOCALE_ID, useValue: "it-IT" },
  ]
})
export class HistoryModule {}
