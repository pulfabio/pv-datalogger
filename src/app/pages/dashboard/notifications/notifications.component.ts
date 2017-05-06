import { Component } from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

import { NotificationsService } from './notifications.service';
import moment from "moment";

import 'style-loader!./notifications.scss';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.html'
})
export class Notifications {

  private errorMessage: string;
  public eReteAcDt: string;
  public eTensioneFVDt: string;
  public eBatteryDt: string;
  public eOverLoadDt: string;
  public eFaultDt: string;
  public eByPassDt: string;
  public eReteAcClass: string;
  public eTensioneFVClass: string;
  public eBatteryClass: string;
  public eOverLoadClass: string;
  public eFaultClass: string;
  public eByPassClass: string;
  public reteColor: string;
  public tensioneColor: string;
  public batteryColor: string;
  public overLoadColor: string;
  public faultColor: string;
  public byPassColor: string;

  private _init = false; //Lifecycle hook ngDoCheck must be run only once

  constructor(
    private _notificationsService: NotificationsService,
    private _baConfig:BaThemeConfigProvider
    ) {}

  ngOnInit() {
    this.getNotificationsData();
  } //Call method at lifecycle hook OnInit.

  getNotificationsData() { //Get data for summary piecharts
    this._notificationsService.getNotificationsData()
    .subscribe(
      notificationsData => {
        let result = this.parseSummary(notificationsData);
        this.eReteAcDt = result.eReteAcDt,
        this.eTensioneFVDt = result.eTensioneFVDt,
        this.eBatteryDt = result.eBatteryDt,
        this.eOverLoadDt = result.eOverLoadDt,
        this.eFaultDt = result.eFaultDt,
        this.eByPassDt = result.eByPassDt,
        this.eReteAcClass = result.eReteAcClass,
        this.eTensioneFVClass = result.eTensioneFVClass,
        this.eBatteryClass = result.eBatteryClass,
        this.eOverLoadClass = result.eOverLoadClass,
        this.eFaultClass = result.eFaultClass,
        this.eByPassClass = result.eByPassClass,
        this.reteColor = result.reteColor;
        this.tensioneColor = result.tensioneColor;
        this.batteryColor = result.batteryColor;
        this.overLoadColor = result.overLoadColor;
        this.faultColor = result.faultColor;
        this.byPassColor = result.byPassColor;
      }, //Parses response
      error => this.errorMessage = <any>error
    )
  }

  private parseSummary = (data) => {
    //Parses api http response

    let modbus = [];
    let outputlist = [];

    let EventsLastDt = "";
    let EReteAcClass = "";
    let EReteAcDt = "";
    let ETensioneFVClass = "";
    let ETensioneFVDt = "";
    let EBatteryClass = "";
    let EBatteryDt = "";
    let EOverLoadClass = "";
    let EOverLoadDt = "";
    let EFaultClass = "";
    let EFaultDt = "";
    let EByPassClass = "";
    let EByPassDt = "";
    let ReteColor = "";
    let TensioneColor = "";
    let BatteryColor = "";
    let OverLoadColor = "";
    let FaultColor = "";
    let ByPassColor = "";
    let PVOverVoltage = 0;

    (<any>Object).entries(data.Result).forEach(([key, value]) => {
      modbus.push(value);
    });

    (<any>Object).entries(modbus[0]).forEach(([key2, value2]) => {
      outputlist.push(value2);
    });

    (<any>Object).entries(outputlist).forEach(([objkey, objlist]) => {

      (<any>Object).entries(objlist).forEach(([key3, value3]) => {
        //var jsonArg = new Object();
        let value = value3;

        switch (key3) {
          case "Dt":
            EventsLastDt = value;
            break;
          case "ACFault":
            if (EReteAcClass == "")
              EReteAcClass = value;
            break;
          case "ACChargingOn":

            break;
          case "ACNaturalFrequencyMode":

            break;
          case "BatteryFault":
            if (EBatteryClass == "")
              EBatteryClass = value;

            if (EFaultClass == "")
              EFaultClass = value;
            break;
          case "BatteryOverChargingProtection":

            break;
          case "BatteryOverVoltage":
            if (EBatteryClass == "") {
              EBatteryClass = value;
            }
            break;
          case "BatteryTestMode":

            break;
          case "BatteryUnderVoltage":
            if (EBatteryClass == "")
              EBatteryClass = value;
            break;
          case "BUSFault":
            if (EFaultClass == "")
              EFaultClass = value;
            break;
          case "CountdownShutdownActivation":

            break;
          case "CountdownTurnOnActivation":

            break;
          case "GreenMode":

            break;
          case "MPPTIGBTProtection":

            break;
          case "OverLoad":
            if (EOverLoadClass == "")
                EOverLoadClass = value;
            break;
          case "OverTemperatureProtection":

            break;
          case "PVandBatteryMode":

            break;
          case "PVChargingCountDownIsOn":

            break;
          case "PVReverse":
            if (ETensioneFVClass == "")
              ETensioneFVClass = value;
            break;
          case "PVUnderVoltage":
            if (ETensioneFVClass == "")
              ETensioneFVClass = value;

            break;
          case "PvOverVoltage":
            if (ETensioneFVClass == "")
              ETensioneFVClass = value;

            if (value == "red") PVOverVoltage = 1;
            else PVOverVoltage = 0;

            break;
          case "SPIFault":
            if (EFaultClass == "")
              EFaultClass = value;
            break;
          case "SwitchOnState":
            if (EByPassClass == "")
              EByPassClass = value;
            break;
          default:
            break;
        }
      });
    });

    // ReteAc
    if (EReteAcClass == "") {
      ReteColor = "palegreen";
      EReteAcDt = "";
      EReteAcClass = "fa fa-plug";
    }
    else if(EReteAcClass == "green")
    {
      ReteColor = "green";
      EReteAcDt = EventsLastDt;
      EReteAcClass = "fa fa-plug";
    }
    else if(EReteAcClass == "red")
    {
      ReteColor = "red";
      EReteAcDt = EventsLastDt;
      EReteAcClass = "fa fa-plug";
    }

        // Tensione FV OverVoltage
    if (PVOverVoltage == 1) {
      if (ETensioneFVClass == "") {
        TensioneColor = "palegreen";
        ETensioneFVDt = "";
        ETensioneFVClass = "fa fa-arrow-up";
      }
      else if (ETensioneFVClass == "green") {
        TensioneColor = "green";
        ETensioneFVDt = EventsLastDt;
        ETensioneFVClass = "fa fa-arrow-up";
      }
      else if (ETensioneFVClass == "red") {
        TensioneColor = "red";
        ETensioneFVDt = EventsLastDt;
        ETensioneFVClass = "fa fa-arrow-up";
      }
    }
    else // Tensione FV UnderVoltage
    {
      if (ETensioneFVClass == "") {
        TensioneColor = "palegreen";
        ETensioneFVDt = "";
        ETensioneFVClass = "fa fa-arrow-down";
      }
      else if (ETensioneFVClass == "green") {
        TensioneColor = "green";
        ETensioneFVDt = EventsLastDt;
        ETensioneFVClass = "fa fa-arrow-down";
      }
      else if (ETensioneFVClass == "red") {
        TensioneColor = "red";
        ETensioneFVDt = EventsLastDt;
        ETensioneFVClass = "fa fa-arrow-down";
      }
    }

    //Battery
    if (EBatteryClass == "") {
      BatteryColor = "palegreen";
      EBatteryDt = "";
      EBatteryClass = "fa fa-battery-4";// bordered-1 bordered-palegreen palegreen";
    }
    else if(EBatteryClass == "green")
    {
      BatteryColor = "green";
      EBatteryDt = EventsLastDt;
      EBatteryClass = "fa fa-battery-4";// bordered-1 bordered-green green";
    }
    else if(EBatteryClass == "red")
    {
      BatteryColor = "red";
      EBatteryDt = EventsLastDt;
      EBatteryClass = "fa fa-battery-4";// bordered-1 bordered-red red";
    }

    //Sovraccarico
    if (EOverLoadClass == "") {
      OverLoadColor = "palegreen";
      EOverLoadDt = "";
      EOverLoadClass = "fa fa-bolt";
    }
    else if(EOverLoadClass == "green")
    {
      OverLoadColor = "green";
      EOverLoadDt = EventsLastDt;
      EOverLoadClass = "fa fa-bolt";
    }
    else if(EOverLoadClass == "red")
    {
      OverLoadColor = "red";
      EOverLoadDt = EventsLastDt;
      EOverLoadClass = "fa fa-bolt";
    }

    //Guasto
    if (EFaultClass == "") {
      FaultColor = "palegreen";
      EFaultDt = "";
      EFaultClass = "fa fa-bell-o";
    }
    else if(EFaultClass == "green")
    {
      FaultColor = "green";
      EFaultDt = EventsLastDt;
      EFaultClass = "fa fa-bell-o";
    }
    else if(EFaultClass == "red")
    {
      FaultColor = "red";
      EFaultDt = EventsLastDt;
      EFaultClass = "fa fa-bell-o";
    }

    //ByPass
    if (EByPassClass == "") {
      ByPassColor = "palegreen";
      EByPassDt = "";
      EByPassClass = "fa fa-retweet";
    }
    else if(EByPassClass == "green")
    {
      ByPassColor = "green";
      EByPassDt = EventsLastDt;
      EByPassClass = "fa fa-retweet";
    }
    else if(EByPassClass == "red")
    {
      ByPassColor = "red";
      EByPassDt = EventsLastDt;
      EByPassClass = "fa fa-retweet";
    }


    return {
      eReteAcDt: EReteAcDt,
      eTensioneFVDt: ETensioneFVDt,
      eBatteryDt: EBatteryDt,
      eOverLoadDt: EOverLoadDt,
      eFaultDt: EFaultDt,
      eByPassDt: EByPassDt,
      eReteAcClass: EReteAcClass,
      eTensioneFVClass: ETensioneFVClass,
      eBatteryClass: EBatteryClass,
      eOverLoadClass: EOverLoadClass,
      eFaultClass: EFaultClass,
      eByPassClass: EByPassClass,
      reteColor: ReteColor,
      tensioneColor: TensioneColor,
      batteryColor: BatteryColor,
      overLoadColor: OverLoadColor,
      faultColor: FaultColor,
      byPassColor: ByPassColor
    }
  }
}