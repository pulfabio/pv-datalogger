import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './technical.routing';

import { TechnicalService } from './technical.service';

import { Technical } from './technical.component';

import { Summary } from './technicalTabs/summary/summary.component';
import { Detail } from './technicalTabs/detail/detail.component';

import { DatepickerModule } from 'ng2-bootstrap/datepicker';

import { LOCALE_ID } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    //MomentModule,
    DatepickerModule.forRoot(),
    routing
  ],
  declarations: [
    Technical,
    Summary,
    Detail
  ],
  providers: [
    TechnicalService,
    { provide: LOCALE_ID, useValue: "it-IT" },
  ]
})
export class TechnicalModule {}
