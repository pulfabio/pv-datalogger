import {Injectable} from '@angular/core';

import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx'; //For test w/o server side

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PieChartService {
  private connectionUrl = "http://bws-datalogger.besquare.it/api/Internet";
  private summaryUrl = "http://bws-datalogger.besquare.it/api/DashBoardSummary04";

  constructor(
    private http: Http) {
  }

  getConnection(): any {
    return this.http.get(this.connectionUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getSummaryData(): any {
    //WITH AUTOMATIC REFRESH
    return Observable.interval(60000) //Automatic data refresh
    .startWith(0)
    .flatMap(() =>
      this.http.get(this.summaryUrl)
    )
    .map(this.extractData)
    .catch(this.handleError);

    //W/O AUTOMATIC REFRESH
    // return this.http.get(this.summaryUrl)
    //   .map(this.extractData)
    //   .catch(this.handleError);
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

  //MOCK DATA
  // getData() {
  //   //let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
  //   return [
  //     {
  //       color: '#FB6E52',
  //       description: 'Energia Prelevata',
  //       stats: '300 W',
  //       icon: 'fa-bolt',
  //     }, {
  //       color: '#0072C6',
  //       description: 'Produzione FV',
  //       stats: '1376 W',
  //       icon: 'fa-sun-o',
  //     }, {
  //       color: '#33CC00',
  //       description: 'Consumo Casa',
  //       stats: '1300 W',
  //       icon: 'fa-home',
  //     }, {
  //       color: '#FFCE55',
  //       description: 'Accululo in carica',
  //       stats: '49 W',
  //       icon: 'fa-battery-three-quarters',
  //     }
  //   ];
  // }
}
