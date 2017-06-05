import {Component, ViewChild} from '@angular/core';
import {BaThemeConfigProvider, colorHelper, layoutPaths} from '../../../../theme';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/it';

import { Subscription } from 'rxjs/Subscription';

import {LoadsTabsService} from '../loadsTabs.service';

import {ModalComponent} from '../../../../../shared/components/modal/modal.component';

import 'style-loader!./rules.scss';

@Component({
  selector: 'rules',
  templateUrl: './rules.html'
})
export class Rules {
  @ViewChild(ModalComponent)

  public modal: ModalComponent;
  private errorMessage: string;
  public contactsListOutput: Array<Object>;
  public contactsListInput: Array<Object>;
  public rules: Array<Object>;
  private subscriptionOut: Subscription = new Subscription();
  private subscriptionIn: Subscription = new Subscription();
  private subscriptionRules: Subscription = new Subscription();
  private busy: Subscription = new Subscription();
  private subscriptionActdeact: Subscription = new Subscription();
  private subscriptionDelete: Subscription = new Subscription();
  public yesNoOptions: Array<Object> = [
           { value: 0, label: 'No' },
           { value: 1, label: 'Si' }
         ];
  public modalTitle: string;
  public MessageSettings: string;
  public actdeactrule_ena: boolean;

  constructor(
    private _loadsTabsService: LoadsTabsService,
    private _baConfig: BaThemeConfigProvider,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    moment.locale('it');
    this.getConnection();
    this.getRules();
    this.getOutputs();
    this.getInputs();
  } //Call method at lifecycle hook OnInit.

  ngOnDestroy() {
    this.subscriptionOut.unsubscribe();
    this.subscriptionIn.unsubscribe();
    this.subscriptionRules.unsubscribe();
    this.subscriptionDelete.unsubscribe();
    this.subscriptionActdeact.unsubscribe();
    this.busy.unsubscribe();
  }

  getConnection() {
    this.busy = this._loadsTabsService.getConnectionRules().subscribe();
  }

  getInputs = () => {
    this.subscriptionIn = this._loadsTabsService.getInputs()
    .subscribe(
      inputs => {
        //let result = this.parseRealTimeData(realTimeData);
        this.contactsListInput = this.parseContacts(inputs);
      },
      error => this.errorMessage = <any>error
    )
  }

  getOutputs = () => {
    this.subscriptionOut = this._loadsTabsService.getOutputs()
    .subscribe(
      outputs => {
        //let result = this.parseRealTimeData(realTimeData);
        this.contactsListOutput = this.parseContacts(outputs);
      },
      error => this.errorMessage = <any>error
    )
  }

  //Works for both Outputs and Inputs
  private parseContacts(data) {
    let modbus = [];
    let contacts = [];

    (<any>Object).entries(data.Result).forEach(([key, value]) => {
    modbus.push(value);
    });

    (<any>Object).entries(modbus[0]).forEach(([key2, value2]) => {
    contacts.push(value2);
    });

    return contacts;
  }

  getRules = () => {
    this.subscriptionRules = this._loadsTabsService.getRules()
    .subscribe(
      rules => {
        //let result = this.parseRealTimeData(realTimeData);
        this.rules = this.parseRules(rules);
        //console.log(this.rules);
      },
      error => this.errorMessage = <any>error
    )
  }

  private parseRules(data) {
    let modbus = [];
    let rules = [];

    (<any>Object).entries(data.Result).forEach(([key, value]) => {
    modbus.push(value);
    });

    (<any>Object).entries(modbus[0]).forEach(([key2, value2]) => {
    rules.push(value2);
    });

    return rules;
  }

  deleteRule = (rule) => {
    if (confirm('Sei sicuro di voler eliminare la regola?')) {
      this.subscriptionDelete = this._loadsTabsService.deleteRule(rule)
      .subscribe(
        data => {
          this.getRules(); //Refresh the list of rules
          //let result = this.parseRealTimeData(realTimeData);
          this.MessageSettings = data.msg;
          this.actdeactrule_ena = true;
        },
        error => {
          this.errorMessage = <any>error;
          this.MessageSettings = error; //error is already in the form of a message
          this.actdeactrule_ena = false;
        }
      )

      this.modalTitle = "Eliminazione regola gestione carichi";
      this.modal.show();

    }
  };

  actdeactRule = (rule) => {
    if (confirm('Sei sicuro di voler cambiare lo stato della regola?')) {
      this.subscriptionActdeact = this._loadsTabsService.actdeactRule(rule.active, rule)
      .subscribe(
        data => {
          //let result = this.parseRealTimeData(realTimeData);
          this.MessageSettings = data.msg;
          this.actdeactrule_ena = true;
        },
        error => {
          this.errorMessage = <any>error;
          this.MessageSettings = error;
          this.actdeactrule_ena = false;
        }
      )

      this.modalTitle = "Modifica stato regola gestione carichi";
      this.modal.show();

    }
  };

  public newRule = () => {
    this.router.navigate(['../new-rule'], { relativeTo: this.route });
  }

  public editRule = (ruleId: string) => {
    this.router.navigate(['../edit-rule', ruleId], { relativeTo: this.route });
  }

}