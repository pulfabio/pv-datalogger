import {Component} from '@angular/core';

//import { Subscription } from 'rxjs/Subscription';

import { DashboardService } from './dashboard.service';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {

  //private busy: Subscription = new Subscription();

  constructor(private _dashboardService: DashboardService) {
  }

  // ngOnInit() {
  //   this.getConnection();
  // }

  // ngOnDestroy() {
  //   this.busy.unsubscribe();
  // }

  // getConnection() {
  //   this.busy = this._dashboardService.getConnection().subscribe();
  // }

}
