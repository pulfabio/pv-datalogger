import {Component} from '@angular/core';
import {BaThemeConfigProvider, colorHelper, layoutPaths} from '../../../../theme';
import * as moment from 'moment';
import 'moment/locale/it';

import { Subscription } from 'rxjs/Subscription';

import {EventsTabsService} from '../eventsTabs.service';

import 'style-loader!./latest.scss';

@Component({
  selector: 'latest',
  templateUrl: './latest.html'
})
export class Latest {

  private errorMessage: string;
  public dt: Date;
  public events: any;
  private subscription: Subscription = new Subscription();
  private busy: Subscription = new Subscription();

  constructor(
    private _eventsTabsService: EventsTabsService,
    private _baConfig: BaThemeConfigProvider
    ) {}

  ngOnInit() {
    moment.locale('it');
    this.getConnection();
    this.getTimeData(); //Get date
    this.getLatestData(); //Get charts data
  } //Call method at lifecycle hook OnInit.

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.busy.unsubscribe();
  }

  getConnection() {
    this.busy = this._eventsTabsService.getConnectionLatest().subscribe();
  }

  //Get date:
  getTimeData() {
    this._eventsTabsService.getTimeData()
    .subscribe(
      timeData => {
        let result = this.parseTimeData(timeData);
        this.dt = result.initialDate;
        }, //Parses response
      error => this.errorMessage = <any>error
    )
  }

  private parseTimeData = (data) => {
    let datetimeweather = [];
    let outputlist = [];

    let CurrentTime = {};
    let CurrentTimePercent = {};
    let CurrentTimePercentWidth: string;
    let CurrentDate: string;
    let CurrentDateDD: string;
    let InitialDate: Date;

    (<any>Object).entries(data.Result).forEach(([key, value]) => {
      datetimeweather.push(value);
    });

    (<any>Object).entries(datetimeweather[0]).forEach(([key2, value2]) => {
      outputlist.push(value2);
    });

    (<any>Object).entries(outputlist).forEach(([objkey, objlist]) => {

      (<any>Object).entries(objlist).forEach(([key3, value3]) => {
        //var jsonArg = new Object();
        let value = value3;

        switch (key3) {
          case "Date":
            InitialDate = new Date(value);
            break;
        }
      });
    });

    return {
      initialDate: InitialDate
    }
  }

  getLatestData = () => {
    this.subscription = this._eventsTabsService.getLatestData()
    .subscribe(
      latestData => {
        //let result = this.parseRealTimeData(realTimeData);
        this.events = this.parseLatestData(latestData);
      }, //Parses response and populates charts object array
      error => this.errorMessage = <any>error
    )
  }

  private parseLatestData(data) {
    let modbus = [];
    let outputlist = [];
    let events = [];

    // (<any>Object).entries(data.Result).forEach(([key, value]) => {
    // modbus.push(value);
    // });

    // (<any>Object).entries(modbus[0]).forEach(([key2, value2]) => {
    // outputlist.push(value2);
    // });

    modbus.push(data.Result);
    outputlist.push(modbus[0].ModBusReader);

    (<any>Object).entries(outputlist).forEach(([objkey, objlist]) => {

      let jsonH = {};


      jsonH["Tick"] = objlist.Tick;
      jsonH["Message"] = objlist.Message;
      jsonH["Dt"] = objlist.Dt;
      jsonH["Type"] = objlist.Type;
      jsonH["Icon"] = objlist.Icon;
      jsonH["TicketBg"] = objlist.TicketBg;
      jsonH["Background"] = objlist.Background;

      events.push(jsonH);

    });

    return events;
  }
}