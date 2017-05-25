import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';

import { AuthGuardService } from "../../shared/services/auth-guard.service";

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing
  ],
  declarations: [Pages],
  providers: [AuthGuardService],
})
export class PagesModule {
}
