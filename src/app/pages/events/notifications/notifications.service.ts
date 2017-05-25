import {Injectable} from '@angular/core';

import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import {ApiUrl} from '../../../../shared/constants/apiUrl';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NotificationsService {
  private notificationsUrl = ApiUrl.API_URL + "DashBoardSummary02";

  constructor(
    private http: Http) {
  }

  getNotificationsData(): any {
    //WITH AUTOMATIC REFRESH
    return Observable.interval(60000) //Automatic data refresh
    .startWith(0)
    .flatMap(() =>
      this.http.get(this.notificationsUrl)
    )
    .map(this.extractData)
    .catch(this.handleError);

    //W/O AUTOMATIC REFRESH
    // return this.http.get(this.notificationsUrl)
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

}