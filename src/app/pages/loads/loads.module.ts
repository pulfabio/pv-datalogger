import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

// Loading/Busy indicator
import {BusyModule} from 'angular2-busy';

import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { routing }       from './events.routing';

import { LoadsTabsService } from './loadsTabs/loadsTabs.service';

import { LoadsMain } from './loadsMain.component';
import { Rules } from './loadsTabs/rules/rules.component';
import { Contacts } from './loadsTabs/contacts/contacts.component';
import { NewRule } from './newRule.component';
import { EditRule } from './editRule.component';

import {ModalComponent} from '../../../shared/components/modal/modal.component';

import {CounterComponent} from '../../../shared/components/counter/counter.component';

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
    TimepickerModule.forRoot(),
    routing
  ],
  declarations: [
    LoadsMain,
    Rules,
    Contacts,
    NewRule,
    EditRule,
    ModalComponent,
    CounterComponent
  ],
  providers: [
    LoadsTabsService,
    { provide: LOCALE_ID, useValue: "it-IT" },
  ]
})
export class LoadsModule {}
