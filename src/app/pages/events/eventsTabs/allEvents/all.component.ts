import {Component} from '@angular/core';
import {BaThemeConfigProvider, colorHelper, layoutPaths} from '../../../../theme';
import * as moment from 'moment';
import 'moment/locale/it';

import { Subscription } from 'rxjs/Subscription';

import {EventsTabsService} from '../eventsTabs.service';

import 'style-loader!./all.scss';

@Component({
  selector: 'all',
  templateUrl: './all.html'
})
export class All {

  private errorMessage: string;
  public dt: Date;
  public events: Object;
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
    this.getAllData(); //Get charts data
  } //Call method at lifecycle hook OnInit.

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.busy.unsubscribe();
  }

  getConnection() {
    this.busy = this._eventsTabsService.getConnectionAll().subscribe();
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

  getAllData = () => {
    this.subscription = this._eventsTabsService.getAllData()
    .subscribe(
      allData => {
        //let result = this.parseRealTimeData(realTimeData);
        this.events = this.parseAllData(allData);
      }, //Parses response and populates charts object array
      error => this.errorMessage = <any>error
    )
  }

  private parseAllData(data) {
    let modbus = [];
    let outputlist = [];
    let events = [];

    // (<any>Object).entries(data.Result).forEach(([key, value]) => {
    // modbus.push(value);
    // });

    // (<any>Object).entries(modbus[0]).forEach(([key2, value2]) => {
    // outputlist.push(value2);
    // });

    // modbus.push(data.Result);
    // outputlist.push(modbus[0].ModBusReader);

    (<any>Object).entries(data.Result).forEach(([key, value]) => {
    modbus.push(value);
    });

    (<any>Object).entries(modbus[0]).forEach(([key2, value2]) => {
    outputlist.push(value2);
    });

    (<any>Object).entries(outputlist).forEach(([objkey, objlist]) => {

      // let color = "";
      // if (objlist["Background"] === "label label-green") {
      //   color = "#90b900";
      // } else if (objlist["Background"] === "label label-yellow") {
      //   color = "#dfb81c";
      // } else if (objlist["Background"] === "label label-red") {
      //   color = "#e85656";
      // }

      events.push({
        Tick: objlist["Tick"],
        Message: objlist["Message"],
        Dt: objlist["Dt"],
        Type: objlist["Type"],
        Icon: objlist["Icon"],
        Background: objlist["Background"],
        TicketBg: objlist["TicketBg"]
        //Color: color
      });

    });

    return events;
  }
}