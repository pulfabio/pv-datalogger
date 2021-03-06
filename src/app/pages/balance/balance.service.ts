import {Injectable} from '@angular/core';

import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx'; //For test w/o server side

import {ApiUrl} from '../../../shared/constants/apiUrl';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BalanceService {
  private timeUrl = ApiUrl.API_URL + 'DashBoardDateTimeWeather04';
  private monthlyUrl = ApiUrl.API_URL + 'BalanceMonthly04?date=';
  private dailyUrl = ApiUrl.API_URL + 'BalanceDaily04?date=';
  private annualUrl = ApiUrl.API_URL + 'BalanceAnnual04?date=';

  constructor(
    private http: Http) {
  }

  //Used for busy/loading indicator
  getConnection(): any {
    return this.http.get(this.timeUrl)
        .map(this.extractData)
        .catch(this.handleError);
  }

  getTimeData(): any {
    return this.http.get(this.timeUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getMonthlyBalanceData(date): any {
    //WITH AUTOMATIC REFRESH
    // return Observable.interval(60000) //Automatic data refresh
    // .startWith(0)
    // .flatMap(() =>
    //   this.http.get(this.monthlyUrl + date)
    // )
    // .map(this.extractData)
    // .catch(this.handleError);

    //W/O AUTOMATIC REFRESH
    return this.http.get(this.monthlyUrl + date)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getDailyBalanceData(date): any {
    //WITH AUTOMATIC REFRESH
    // return Observable.interval(60000) //Automatic data refresh
    // .startWith(0)
    // .flatMap(() =>
    //   this.http.get(this.dailyUrl + date)
    // )
    // .map(this.extractData)
    // .catch(this.handleError);

    //W/O AUTOMATIC REFRESH
    return this.http.get(this.dailyUrl + date)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAnnualBalanceData(date): any {
    //WITH AUTOMATIC REFRESH
    // return Observable.interval(60000) //Automatic data refresh
    // .startWith(0)
    // .flatMap(() =>
    //   this.http.get(this.annualUrl + date)
    // )
    // .map(this.extractData)
    // .catch(this.handleError);

    //W/O AUTOMATIC REFRESH
    return this.http.get(this.annualUrl + date)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
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
    return Observable.throw(errMsg);
  }

}