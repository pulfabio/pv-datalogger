import {Injectable} from '@angular/core';

import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import {ApiUrl} from '../../../../shared/constants/apiUrl';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoadsService {
  private inputsUrl = ApiUrl.API_URL + "LoadManageContactsInput";
  private outputsUrl = ApiUrl.API_URL + "LoadManageContactsOutput";
  private saveNewRuleUrl = ApiUrl.API_URL + "LoadManageRules";
  private saveEditRuleUrl = ApiUrl.API_URL + "LoadManageRulesEdit";
  private editRuleUrl = ApiUrl.API_URL + "LoadManageRulesEdit";

  constructor(
    private http: Http) {
  }

  //Used for busy/loading indicator
  getConnection(): any {
    return this.http.get(this.inputsUrl)
        .map(this.extractData)
        .catch(this.handleError);
  }

  getInputs(): any {
    return this.http.get(this.inputsUrl)
        .map(this.extractData)
        .catch(this.handleError);
  }

  getOutputs(): any {
    return this.http.get(this.outputsUrl)
        .map(this.extractData)
        .catch(this.handleError);
  }

  getEditRule(ruleId) {
    return this.http.get(this.editRuleUrl + '/' + ruleId)
      .map(this.extractData)
      .catch(this.handleError);
  }

  saveNewRule(rule): any {
    return this.http.post(
      this.saveNewRuleUrl,
      JSON.stringify(rule),
      {headers:new Headers({'Content-Type':'application/json'})}
      )
      .map(this.extractData)
      .catch(this.handleError);
  }

  saveEditRule(rule): any {
    return this.http.post(
      this.saveEditRuleUrl,
      JSON.stringify(rule),
      {headers:new Headers({'Content-Type':'application/json'})}
      )
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