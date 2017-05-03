import {Component} from '@angular/core';
import { BalanceService } from './balance.service';
//import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'balance',
  styleUrls: ['./balance.scss'],
  templateUrl: './balance.html'
})
export class Balance {

  //private busy: Subscription = new Subscription();

  constructor(
    private _balanceService: BalanceService
  ) {}

  // ngOnInit() {
  //   this.getConnection();
  // }

  // ngOnDestroy() {
  //   this.busy.unsubscribe();
  // }

  // getConnection() {
  //   this.busy = this._balanceService.getConnection().subscribe();
  // }

}