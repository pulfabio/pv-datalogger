import {Injectable} from '@angular/core';

import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import {ApiUrl} from '../../../../shared/constants/apiUrl';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoadsTabsService {
  private inputsUrl = ApiUrl.API_URL + "LoadManageContactsInput";
  private outputsUrl = ApiUrl.API_URL + "LoadManageContactsOutput";
  private rulesUrl = ApiUrl.API_URL + "LoadManageRules";
  private deleteRuleUrl = ApiUrl.API_URL + 'LoadManageRulesDelete';
  private activeRuleUrl = ApiUrl.API_URL + 'LoadManageRulesActivateOn';
  private activeRuleUrlOn = ApiUrl.API_URL + 'LoadManageRulesActivateOn';
  private activeRuleUrlOff = ApiUrl.API_URL + 'LoadManageRulesActivateOff';
  private submitRuleUrl = ApiUrl.API_URL + 'LoadManageRules';
  private contactsUrl = ApiUrl.API_URL + 'LoadManageContacts';
  private goDigitalUrl = ApiUrl.API_URL + 'LoadManageContactsGo';

  constructor(
    private http: Http) {
  }

  //Used for busy/loading indicator
  getConnectionRules(): any {
    return this.http.get(this.rulesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  //Used for busy/loading indicator
  getConnectionOutputs(): any {
    return this.http.get(this.outputsUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  //Used for busy/loading indicator
  getConnectionContacts(): any {
    return this.http.get(this.contactsUrl)
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

  getRules(): any {
    return this.http.get(this.rulesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteRule(rule): any {
    return this.http.get(this.deleteRuleUrl + '/' + rule.ruleId)
      .map(this.extractData)
      .catch(this.handleError);
  }

  actdeactRule(activeStatus, rule): any {
    // Set right Url depending on rule's activeStatus
    if (activeStatus === 1) {
      this.activeRuleUrl = this.activeRuleUrlOn;
    }
    else
    {
        this.activeRuleUrl = this.activeRuleUrlOff;
    }

    return this.http.get(this.activeRuleUrl + '/' + rule.ruleId)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getContacts(): any {
    return this.http.get(this.contactsUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  contactSaved(contact): any {
    return this.http.post(
      this.contactsUrl + "/" + contact.id,
      JSON.stringify(contact),
      {headers:new Headers({'Content-Type':'application/json'})}
      )
      .map(this.extractData)
      .catch(this.handleError);
  }

  goDigital(id, outputpin): any {
    return this.http.post(
      this.goDigitalUrl + "/" + id,
      JSON.stringify(outputpin),
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