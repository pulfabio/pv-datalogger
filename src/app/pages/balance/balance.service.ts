import {Injectable} from '@angular/core';

import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable'; //For test w/o server side

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BalanceService {
  private timeUrl = "http://bws-datalogger.besquare.it/api/DashBoardDateTimeWeather04";
  private monthlyUrl = 'http://bws-datalogger.besquare.it/api/BalanceMonthly04?date=';
  private dailyUrl = 'http://bws-datalogger.besquare.it/api/BalanceDaily04?date=';
  private annualUrl = 'http://bws-datalogger.besquare.it/api/BalanceAnnual04?date=';

  constructor(
    private http: Http) {
  }

  getTimeData(): any {
    return this.http.get(this.timeUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getMonthlyBalanceData(date): any {
    return this.http.get(this.monthlyUrl + date)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getDailyBalanceData(date): any {
    return this.http.get(this.dailyUrl + date)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAnnualBalanceData(date): any {
    return this.http.get(this.annualUrl + date)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body || { };
  }

  // handleError method as per the Angular.io website
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}