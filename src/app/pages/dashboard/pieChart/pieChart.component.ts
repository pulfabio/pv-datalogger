import { Component } from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

import { PieChartService } from './pieChart.service';

import { Subscription } from 'rxjs/Subscription';

import 'easy-pie-chart/dist/jquery.easypiechart.js';
import 'style-loader!./pieChart.scss';

@Component({
  selector: 'pie-chart',
  templateUrl: './pieChart.html'
})
// TODO: move easypiechart to component
export class PieChart {

  private errorMessage: string;
  public chartsData: Array<Object>; //chart objects for summary piecharts
  public isAbsorbingGreen: boolean;
  public dailyGeneratedEnergy: any;
  public totalGeneratedEnergy: any;
  private _init = false; //Lifecycle hook ngDoCheck must be run only once
  private subscription: Subscription = new Subscription();
  private busy: Subscription = new Subscription();

  constructor(
    private _pieChartService: PieChartService,
    private _baConfig:BaThemeConfigProvider
  ) { }

  ngOnInit() {
    this.getConnection();
    this.getSummaryData();
  } //Call method at lifecycle hook OnInit.

  // ngDoCheck() {
  //   if (!this._init) {
  //     this._loadPieCharts();
  //     this._updatePieCharts(this.chartsData);
  //   };
  // } //Call method at DoCheck, only once through this._init

  ngAfterViewChecked() {
    if (!this._init) {
      this._loadPieCharts();
      this._updatePieCharts(this.chartsData);
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.busy.unsubscribe();
  }

  getConnection() {
    this.busy = this._pieChartService.getConnection().subscribe();
  }

  getSummaryData() { //Get data for summary piecharts
    this.subscription = this._pieChartService.getSummaryData()
    .subscribe(
      summary => {
        let result = this.parseSummary(summary);
        this.chartsData = result.chartsData;
        this.isAbsorbingGreen = result.isAbsorbingGreen;
        this.dailyGeneratedEnergy = result.dailyGeneratedEnergy;
        this.totalGeneratedEnergy = result.totalGeneratedEnergy;

        //Reset _init to false when data from service is refreshed
        this._init = false;

        // this._loadPieCharts();
        // this._updatePieCharts(this.chartsData);

      }, //Parses response and populates charts object array
      error => this.errorMessage = <any>error
    )
  }

  private parseSummary = (data) => {
    //Parses api http response and populates charts object array

    //Step 1: Parsing http response body
    let modbus = [];
    let outputlist = [];
    let AbsorbingGreen = {};
    let isAbsorbingGreen = false;
    let isStoredEnergy = true;

    let GetByEnelPercent = {};
    let GetByEnelV = {};
    let GetByEnelW = {};
    let GetByEnelDesc = "ENERGIA PRELEVATA";

    let HomeConsumptionPercent = {};
    let HomeConsumptionV = {};
    let HomeConsumptionW = {};
    let HomeConsumptionDesc = "CONSUMO CASA";

    let BatteryChargePercent = {};
    let BatteryVoltage = {};
    let BatteryChargeClass = "''";
    let BatteryChargeDesc = "CAPACITA` ACCUMULO";

    let StoredEnergyPercent = {};
    let StoredEnergyV = {};
    let StoredEnergyW = {};
    let StoredEnergyDesc = "Accumulo";

    let DailyGeneratedEnergy = "";
    let TotalGeneratedEnergy = "";
    let GeneratedPercent = {};
    let GeneratedEnergyDesc = "ENERGIA FV GENERATA";

    let PVEnergyPercent = {};
    let PVEnergyV = {};
    let PVEnergyW = {};
    let PVEnergyDesc = "PRODUZIONE FV";

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
          case "Tick":
            break;
          case "GetByEnelW":
            GetByEnelW = value;
            break;
          case "GetByEnelV":
            GetByEnelV = value;
            break;
          case "GetByEnelPercent":
            GetByEnelPercent = value;
            break;
          case "HomeConsumptionW":
            HomeConsumptionW = value;
            break;
          case "HomeConsumptionV":
            HomeConsumptionV = value;
            break;
          case "HomeConsumptionPercent":
            HomeConsumptionPercent = value;
            break;
          case "StoredEnergyW":
            StoredEnergyW = value;

            if (StoredEnergyW >= 0)
              StoredEnergyDesc = "Accumulo in carica";
            else
              StoredEnergyDesc = "Accumulo in scarica";
            break;
          case "StoredEnergyV":
            StoredEnergyV = value;
            break;
          case "DailyGeneratedEnergy":
            DailyGeneratedEnergy = value;
            break;
          case "TotalGeneratedEnergy":
            TotalGeneratedEnergy = value;
            break;
          case "GeneratedPercent":
            GeneratedPercent = value;
            break;
          case "StoredEnergyPercent":
            StoredEnergyPercent = value;
            break;
          case "PVEnergyW":
            PVEnergyW = value;
            break;
          case "PVEnergyV":
            PVEnergyV = value;
            break;
          case "PVEnergyPercent":
            PVEnergyPercent = value;
            break;
          case "BatteryChargePercent":
            BatteryChargePercent = value;

            if (BatteryChargePercent >= 95)
              BatteryChargeClass = "fa-battery-4";
            else if (BatteryChargePercent >= 81)
              BatteryChargeClass = "fa-battery-3";
            else if (BatteryChargePercent >= 76)
              BatteryChargeClass = "fa-battery-2";
            else if (BatteryChargePercent >= 70)
              BatteryChargeClass = "fa-battery-1";
            else
              BatteryChargeClass = "fa-battery-0";
            break;
          case "BatteryVoltage":
            BatteryVoltage = value;
            break;
          case "AbsorbingGreen":
            AbsorbingGreen = value;

            if (value == "0") {
              isAbsorbingGreen = false;

              if (PVEnergyW <= 0) {
                isStoredEnergy = false;
                let numberStoredEnergyPercent = 0;

                StoredEnergyDesc = "Accumulo in riposo";
              }
              else
              {
                isStoredEnergy = true;
                let numberStoredEnergyPercent = StoredEnergyPercent;
              }
            }
            else {
              isAbsorbingGreen = true;

              if (PVEnergyW <= 0) {
                StoredEnergyDesc = "Accumulo in scarica";
              }
            }

          default:
              break;
        }
      });

      let numberGetByEnelPercent = GetByEnelPercent;
      let numberPVEnergyPercent = PVEnergyPercent;
      let numberHomeConsumptionPercent = HomeConsumptionPercent;
      let numberBatteryChargePercent = BatteryChargePercent;
      let numberStoredEnergyPercent = StoredEnergyPercent;


    });

    //Step 2: Populating charts object array for summary piecharts
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    let chartsData = [
      {
        color: '#cc0000',
        description: 'Energia Prelevata',
        percent : GetByEnelPercent,
        statsW: GetByEnelW + ' W',
        statsV: GetByEnelV + ' V',
        icon: 'fa-plug',
      }, {
        color: '#ffd700',
        description: 'Produzione FV',
        percent: PVEnergyPercent,
        statsW: PVEnergyW + ' W',
        statsV: PVEnergyV + ' V',
        icon: 'fa-sun-o',
      }, {
        color: '#008000',
        description: 'Consumo Casa',
        percent: HomeConsumptionPercent,
        statsW: HomeConsumptionW + ' W',
        statsV: HomeConsumptionV + ' V',
        icon: 'fa-home',
      }, {
        color: '#0000ff',//'#FFCE55',
        description: StoredEnergyDesc,
        percent: StoredEnergyPercent,
        statsW: StoredEnergyW + ' W',
        statsV: StoredEnergyV + ' V',
        icon: BatteryChargeClass,
      }
    ];
    //Test
    //isAbsorbingGreen = false;
    return {
      chartsData: chartsData,
      isAbsorbingGreen: isAbsorbingGreen,
      dailyGeneratedEnergy: DailyGeneratedEnergy,
      totalGeneratedEnergy: TotalGeneratedEnergy
    }
  }

  //leaf padding: 15px 0 0 20px; desc padding: 20px 0 0 0;

  // private _loadPieCharts() {

  //   jQuery('.chart').each(function () {
  //     let chart = jQuery(this);
  //     chart.easyPieChart({
  //       easing: 'easeOutBounce',
  //       onStep: function (from, to, percent) {
  //         jQuery(this.el).find('.percent').text(Math.round(percent));
  //       },
  //       barColor: jQuery(this).attr('data-rel'),
  //       trackColor: 'rgba(0,0,0,0)',
  //       size: 84,
  //       scaleLength: 0,
  //       animation: 2000,
  //       lineWidth: 9,
  //       lineCap: 'round',
  //     });
  //   });
  // }

  // private _updatePieCharts() {
  //   //let getRandomArbitrary = (min, max) => { return Math.random() * (max - min) + min; };
  //   console.log("update");
  //   jQuery('.pie-charts .chart').each(function(index, chart) {
  //     //console.log(this.charts[index].percent);
  //     jQuery(chart).data('easyPieChart').update("59");
  //   });
  // }

  private _loadPieCharts = () => {
    let loaded = false; //Test for this._init switching
    jQuery('.chart').each(function () {
      let chart = jQuery(this);
      chart.easyPieChart({
        easing: 'easeOutBounce',
        onStep: function (from, to, percent) {
          jQuery(this.el).find('.percent').text(Math.round(percent));
        },
        barColor: jQuery(this).attr('data-rel'),
        trackColor: colorHelper.hexToRgbA(jQuery(this).attr('data-rel'), 0.2),//'rgba(0,0,0,0)',
        size: 84,
        scaleLength: 0,
        animation: 2000,
        lineWidth: 9,
        lineCap: 'round',
      });
      loaded = true;
    });
    if (loaded) { this._init = true; } //Switch to true so ngDoCheck will not run forever
  }

  private _updatePieCharts = (chartsData) => {
    jQuery('.pie-charts .chart').each(function(index, chart) {
      //console.log(chartsData[0]);
      jQuery(chart).data('easyPieChart').update(chartsData[index].percent);
    });
  }
}
