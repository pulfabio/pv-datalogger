import {Component, ViewChild} from '@angular/core';
import {BaThemeConfigProvider, colorHelper, layoutPaths} from '../../theme';
import { ActivatedRoute, Params } from "@angular/router";
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import * as moment from 'moment';
import 'moment/locale/it';

import { Subscription } from 'rxjs/Subscription';

import {LoadsService} from './loads.service';

import {ModalComponent} from '../../../shared/components/modal/modal.component';

import {Rule} from '../../../shared/interfaces/rule';

import 'style-loader!./newRule.scss';

@Component({
  selector: 'edit-rule',
  templateUrl: './editRule.html'
})
export class EditRule {
  @ViewChild(ModalComponent)

  public modal: ModalComponent;
  private errorMessage: string;
  public contactsListOutput: Array<Object>;
  public contactsListInput: Array<Object>;
  private subscriptionOut: Subscription = new Subscription();
  private subscriptionIn: Subscription = new Subscription();
  private subscriptionEditRule: Subscription = new Subscription();
  private subscriptionSubmit: Subscription = new Subscription();
  private busy: Subscription = new Subscription();
  public setOn_ruleFactorId: string;
  public setOff_ruleFactorId: string;
  public modalTitle: string;
  public MessageSettings: string;
  public actdeactrule_ena: boolean;

  public editRule: Rule;

  constructor(
    private _loadsService: LoadsService,
    private route: ActivatedRoute,
    private _baConfig: BaThemeConfigProvider
    ) {}

  ngOnInit() {
    moment.locale('it');
    this.getConnection();
    this.getOutputs();
    this.getInputs();
    this.getEditRule();
  } //Call method at lifecycle hook OnInit.

  ngOnDestroy() {
    this.subscriptionOut.unsubscribe();
    this.subscriptionIn.unsubscribe();
    this.subscriptionEditRule.unsubscribe();
    this.subscriptionSubmit.unsubscribe();
    this.busy.unsubscribe();
  }

  getConnection() {
    this.busy = this._loadsService.getConnection().subscribe();
  }

  getInputs = () => {
    this.subscriptionIn = this._loadsService.getInputs()
    .subscribe(
      inputs => {
        //let result = this.parseRealTimeData(realTimeData);
        this.contactsListInput = this.parseContacts(inputs);
      },
      error => this.errorMessage = <any>error
    )
  }

  getOutputs = () => {
    this.subscriptionIn = this._loadsService.getOutputs()
    .subscribe(
      outputs => {
        //let result = this.parseRealTimeData(realTimeData);
        this.contactsListOutput = this.parseContacts(outputs);
      },
      error => this.errorMessage = <any>error
    )
  }

  private parseContacts(data) {
    let modbus = [];
    let contacts = [];

    (<any>Object).entries(data.Result).forEach(([key, value]) => {
    modbus = value;
    });

    (<any>Object).entries(modbus[0]).forEach(([key2, value2]) => {
    contacts.push(value2);
    });

    return contacts;
  }

  getEditRule = () => {
    this.route.params
    .switchMap((params: Params) => this._loadsService.getEditRule(params["ruleId"]))
    .subscribe(
      ruleData => {
        //let result = this.parseRealTimeData(realTimeData);
        this.editRule = ruleData.data;
      },
      error => this.errorMessage = <any>error
    )
  }

  public formSubmit = () => {
    this.subscriptionSubmit = this._loadsService.saveEditRule(this.editRule)
    .subscribe(
      data => {
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

    this.modalTitle = "Modifica regola di gestione carichi";
    this.modal.show();
  };
}