import {Component, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {BaThemeConfigProvider, colorHelper, layoutPaths} from '../../theme';
import * as moment from 'moment';
import 'moment/locale/it';

import { Subscription } from 'rxjs/Subscription';

import {LoadsService} from './loads.service';

import {ModalComponent} from '../../../shared/components/modal/modal.component';

import {Rule} from '../../../shared/interfaces/rule';

import 'style-loader!./editRule.scss';

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
  private subscriptionSubmit: Subscription = new Subscription();
  private subscriptionEditRule: Subscription = new Subscription();
  private busy: Subscription = new Subscription();
  public setOn_ruleFactorId: string;
  public setOff_ruleFactorId: string;
  public modalTitle: string;
  public MessageSettings: string;
  public actdeactrule_ena: boolean;

  //Rule to be edited
  public editRule: Rule;

  //Variables used by ngb-timepicker
  public timeOn: any;
  public timeOff: any;

  constructor(
    private _loadsService: LoadsService,
    private route: ActivatedRoute,
    private router: Router,
    private _baConfig: BaThemeConfigProvider
    ) {}

  ngOnInit() {
    this.initialize();
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
        //console.log(this.contactsListInput);
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
        //console.log(this.contactsListOutput);
      },
      error => this.errorMessage = <any>error
    )
  }

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

  getEditRule = () => {
    this.route.params
    .switchMap((params: Params) => this._loadsService.getEditRule(params["ruleId"]))
    .subscribe(
      ruleData => {
        //let result = this.parseRealTimeData(realTimeData);
        this.editRule = ruleData.data;
        //console.log(this.editRule);
        this.initializeTimepicker();
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

  public back = () => {
    this.router.navigate(['../../rules'], { relativeTo: this.route });
  }

  public updateCount = (count: string, property: string) => {
    this.editRule[property] = count;
  }

  public changeSetOn_time(timeOn) {
    this.editRule.setOn_time = this.timeOn.hour + ":" + this.timeOn.minute + ":" + this.timeOn.second;
  }

  public changeSetOff_time(timeOff) {
    this.editRule.setOff_time = this.timeOff.hour + ":" + this.timeOff.minute + ":" + this.timeOff.second;
  }

  initializeTimepicker = () => {
    //Setting ngb-timepicker times
    let ruleTimeOn = this.editRule.setOn_time;
    let ruleTimeOff = this.editRule.setOff_time;
    this.timeOn = {
      hour: ruleTimeOn.slice(0, 2),
      minute: ruleTimeOn.slice(3, 5),
      second: ruleTimeOn.slice(6),
    };
    this.timeOff = {
      hour: ruleTimeOff.slice(0, 2),
      minute: ruleTimeOff.slice(3, 5),
      second: ruleTimeOff.slice(6),
    }
  }

  initialize = () => {
    let now = new Date();
    this.timeOn = {
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds()
    };
    this.timeOff = {
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds()
    };
    this.editRule = {
      ruleId: "0",
      contactId: "",
      setOn_contactId: "",
      setOn_ruleFactorId: "",
      setOff_ruleFactorId: "",
      setOn_time: this.timeOn.hour + ":" + this.timeOn.minute + ":" + this.timeOn.second,
      setOff_time: this.timeOff.hour + ":" + this.timeOff.minute + ":" + this.timeOff.second,
      setOn_pvprod_ist: "10",
      setOn_pvprod_delay: "10",
      setOn_pvprod_timer: "30",
      setOff_pvprod_ist: "10",
      setOff_pvprod_delay: "10",
      setOff_pvprod_timer: "30"
    }
  }

}