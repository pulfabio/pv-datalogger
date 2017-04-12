import {Injectable} from '@angular/core';

import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx'; //For test w/o server side

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TechnicalService {
  private timeUrl = "http://bws-datalogger.besquare.it/api/DashBoardDateTimeWeather04";
  private summaryUrl = "http://bws-datalogger.besquare.it/api/DashBoardRealTime04Technical?date=";
  private summary2Url = "http://bws-datalogger.besquare.it/api/DashBoardRealTime02Technical?date=";
  private detailUrl = "http://bws-datalogger.besquare.it/api/ModbusReaderRegistry04Technical?date=";
  private detail2Url = "http://bws-datalogger.besquare.it/api/ModbusReaderRegistry02Technical?date=";

  constructor(
    private http: Http) {
  }

  getTimeData(): any {
    return this.http.get(this.timeUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getSummaryData(date): any {
    //WITH AUTOMATIC REFRESH
    return Observable.interval(60000) //Automatic data refresh
    .startWith(0)
    .flatMap(() =>
      this.http.get(this.summaryUrl + date)
    )
    .map(this.extractData)
    .catch(this.handleError);

    //W/O AUTOMATIC REFRESH
    // return this.http.get(this.summaryUrl + date)
    //   .map(this.extractData)
    //   .catch(this.handleError);
  }

  getDetailData(date): any {
    //WITH AUTOMATIC REFRESH (TOO SLOW)
    // return Observable.interval(60000) //Automatic data refresh
    // .startWith(0)
    // .flatMap(() =>
    //   this.http.get(this.detailUrl + date)
    // )
    // .map(this.extractData)
    // .catch(this.handleError);

    //W/O AUTOMATIC REFRESH
    return this.http.get(this.detailUrl + date)
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
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}