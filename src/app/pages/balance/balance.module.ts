import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

// Loading/Busy indicator
import {BusyModule} from 'angular2-busy';

import { routing }       from './balance.routing';

import { Daily } from './balanceTabs/daily/daily.component';
import { Monthly } from './balanceTabs/monthly/monthly.component';
import { Annual } from './balanceTabs/annual/annual.component';

import { BalanceService } from './balance.service';

import { Balance } from './balance.component';

import { DatepickerModule } from 'ng2-bootstrap/datepicker';

import { LOCALE_ID } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    //MomentModule,
    DatepickerModule.forRoot(),
    BusyModule,
    routing,
  ],
  declarations: [
    Balance,
    Daily,
    Monthly,
    Annual
  ],
  providers: [
    BalanceService,
    { provide: LOCALE_ID, useValue: "it-IT" },
  ]
})
export class BalanceModule {}
