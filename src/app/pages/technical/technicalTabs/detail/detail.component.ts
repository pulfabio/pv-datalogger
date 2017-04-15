import {Component} from '@angular/core';
import {BaThemeConfigProvider, colorHelper, layoutPaths} from '../../../../theme';
import {DatepickerModule} from 'ng2-bootstrap/datepicker';
import * as moment from 'moment';
import 'moment/locale/it';

import {TechnicalService} from '../../technical.service';

import 'style-loader!./detail.scss';

@Component({
  selector: 'detail',
  templateUrl: './detail.html'
})
export class Detail {

  private errorMessage: string;
  public dt: Date;
  public chartData: any;
  public monitorChartData: any;
  public datepickerMode: string = "day";
  public minMode: string = "day";
  public maxMode: string = "day";

  constructor(
    private _technicalService: TechnicalService,
    private _baConfig: BaThemeConfigProvider
    ) {}

  ngOnInit() {
    moment.locale('it');
    this.getTimeData(); //Get date
    this.getDetailData(); //Get charts data
  } //Call method at lifecycle hook OnInit.

  // ngOnChanges() {
  //   console.log(this.dt);
  //   this.getMonthlyBalanceData(); //Get charts data
  // } //Call method at lifecycle hook OnInit.

  onChange() {
    this.getDetailData(); //Get charts data
  }

  //Get date:
  getTimeData() {
    this._technicalService.getTimeData()
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

  getDetailData = () => {
    //let date = moment(this.dt).format("DD.MM.YYYY");
    let date = moment(new Date("27 feb 2016")).format("DD.MM.YYYY");
    //console.log(date);
    this._technicalService.getDetailData(date)
    .subscribe(
      detailData => {
        let result = this.parseDetailData(detailData);
        this.chartData = result.chartData;
        this.monitorChartData = result.monitorChartData;
      }, //Parses response and populates charts object array
      error => this.errorMessage = <any>error
    )
  }

  private parseDetailData(data) {
    let modbus = [];
    let outputlist = [];

    (<any>Object).entries(data.Result).forEach(([key, value]) => {
    modbus.push(value);
    });

    (<any>Object).entries(modbus[0]).forEach(([key2, value2]) => {
    outputlist.push(value2);
    });

    let ACInputVoltage = 0;
    let ACOutputFrequency = 0;
    let ACOutputVoltage = 0;
    let BatteryCapacity = 0;
    let BatteryVoltage = 0;
    let ChargeCurrentGrade = 0;
    let ECOMode = 0;
    let GeneratedEnergyThisDay = 0;
    let GreenMode = 0;
    let LoadPercentage = 0;
    let PVChargeCurrent = 0;
    let PVInputVoltage = 0;
    let PVPower = 0;
    let RatedBatteryVoltage = 0;
    let RatedVoltage = 0;
    let Temperature = 0;

    let jsonHoursYear = 0;
    let jsonHoursMonth = 0;
    let jsonHoursDay = 0;
    let jsonHoursHour = 0;
    let jsonHoursMinute = 0;
    let jsonHoursSecond = 0;

    let dataCollection = [];

    (<any>Object).entries(outputlist).forEach(([objkey, objlist]) => {

      let tick = objlist["Tick"].toString();

      jsonHoursYear = tick.substring(0, 4);
      jsonHoursMonth = (tick.substring(4, 6)) - 1;
      jsonHoursDay = tick.substring(6, 8);
      jsonHoursHour = tick.substring(8, 10);
      jsonHoursMinute = tick.substring(10, 12);
      jsonHoursSecond = tick.substring(12, 14);

      let time = new Date(jsonHoursYear, jsonHoursMonth, jsonHoursDay, jsonHoursHour, jsonHoursMinute, jsonHoursSecond);

      let value = "";

      value = objlist["ACInputVoltage"];
      ACInputVoltage = parseFloat(value);

      value = objlist["ACOutputFrequency"];
      ACOutputFrequency = parseFloat(value);

      value = objlist["ACOutputVoltage"];
      ACOutputVoltage = parseFloat(value);

      value = objlist["BatteryCapacity"];
      BatteryCapacity = parseFloat(value);

      value = objlist["BatteryVoltage"];
      BatteryVoltage = parseFloat(value);

      value = objlist["ChargeCurrentGrade"];
      ChargeCurrentGrade = parseFloat(value);

      value = objlist["ECOMode"];
      ECOMode = parseFloat(value);

      value = objlist["GeneratedEnergyThisDay"];
      GeneratedEnergyThisDay = parseFloat(value);

      value = objlist["GreenMode"];
      GreenMode = parseFloat(value);

      value = objlist["LoadPercentage"];
      LoadPercentage = parseFloat(value);

      value = objlist["PVChargeCurrent"];
      PVChargeCurrent = parseFloat(value);

      value = objlist["PVInputVoltage"];
      PVInputVoltage = parseFloat(value);

      value = objlist["PVPower"];
      PVPower = parseFloat(value);

      value = objlist["RatedBatteryVoltage"];
      RatedBatteryVoltage = parseFloat(value);

      value = objlist["RatedVoltage"];
      RatedVoltage = parseFloat(value);

      value = objlist["Temperature"];
      Temperature = parseFloat(value);

      dataCollection.push({
        date: time,
        ACInputVoltage: ACInputVoltage,
        ACOutputFrequency: ACOutputFrequency,
        ACOutputVoltage: ACOutputVoltage,
        BatteryCapacity: BatteryCapacity,
        BatteryVoltage: BatteryVoltage,
        ChargeCurrentGrade: ChargeCurrentGrade,
        ECOMode: ECOMode,
        GeneratedEnergyThisDay: GeneratedEnergyThisDay,
        GreenMode: GreenMode,
        LoadPercentage: LoadPercentage,
        PVChargeCurrent: PVChargeCurrent,
        PVInputVoltage: PVInputVoltage,
        PVPower: PVPower,
        RatedBatteryVoltage: RatedBatteryVoltage,
        RatedVoltage: RatedVoltage,
        Temperature: Temperature,
        graph0: "Energia Prelevata",
        graph1: "Accumulo",
        graph2: "Produzione Fotovoltaico",
        graph3: "Consumo Casa"
      })

    });

    var layoutColors = this._baConfig.get().colors;
    var graphColor = this._baConfig.get().colors.custom.dashboardLineChart;

    return {
      chartData: {
        type: 'serial',
        theme: 'blur',
        language: "it",
        autoMargins: false,
        marginTop: 15,
        marginRight: 130,
        marginBottom: 150,
        marginLeft: 170,
        responsive: {
          'enabled': true
        },
        dataProvider: dataCollection,
        categoryField: 'date',
        categoryAxis: {
          parseDates: true,
          minPeriod: "mm",
          gridAlpha: 0,
          color: layoutColors.defaultText,
          axisColor: layoutColors.defaultText
        },
        valueAxes: [
          {
            id: "v0",
            //title: "valore",
            minVerticalGap: 50,
            gridAlpha: 0,
            color: layoutColors.defaultText,
            axisColor: layoutColors.defaultText
          },
          {
            id: "v1",
            //title: "volt",
            unit: "V",
            minVerticalGap: 50,
            gridAlpha: 0,
            color: layoutColors.defaultText,
            axisColor: layoutColors.defaultText,
            offset: 60
          },
          {
            id: "v2",
            //title: "ampere",
            unit: "A",
            minVerticalGap: 50,
            gridAlpha: 0,
            color: layoutColors.defaultText,
            axisColor: layoutColors.defaultText,
            offset: 120
          },
          {
            id: "v3",
            //title: "percentuale",
            unit: "%",
            minVerticalGap: 50,
            gridAlpha: 0,
            color: layoutColors.defaultText,
            axisColor: layoutColors.defaultText,
            position: "right"
          },
          {
            id: "v4",
            //title: "watt",
            unit: "W",
            minVerticalGap: 50,
            gridAlpha: 0,
            color: layoutColors.defaultText,
            axisColor: layoutColors.defaultText,
            position: "right",
            offset: 60
          }
        ],
        "numberFormatter": {
          "precision": -1,
          "decimalSeparator": ",",
          "thousandsSeparator": ""
        },
        legend: {
          useGraphSettings: true,
          position: "absolute",
          //top: -30,
          bottom: -210,
          left: 50,
          //right: -50,
          autoMargins: false,
          marginTop: 10,
          marginBottom: 50,
          align: "left",
          spacing: 0,
          valueAlign: "left",
          labelText: "[[title]]:",
          valueText: "[[value]]",
          equalWidths: false,
          fontSize: 11
        },
        graphs: [
          {
            id: "g0",
            valueAxis: "v1",
            title: 'AC Input voltage',
            hidden: true,
            bullet: "none",
            useLineColorForBulletBorder: true,
            lineColor: "#cc0000",
            //lineColor: colorHelper.hexToRgbA(graphColor, 0.3),
            lineThickness: 2,
            negativeLineColor: layoutColors.danger,
            type: 'smoothedLine',
            valueField: 'ACInputVoltage',
            fillAlphas: 0,
            fillColorsField: 'lineColor',
            balloonText: "<span>[[title]]: <b>[[value]]</b>V</span>"
          },
          {
            id: "g1",
            valueAxis: "v4",
            title: 'AC Output Frequency',
            hidden: true,
            bullet: "none",
            useLineColorForBulletBorder: true,
            lineColor: "#0000ff",
            //lineColor: colorHelper.hexToRgbA(graphColor, 0.15),
            lineThickness: 2,
            negativeLineColor: layoutColors.danger,
            type: 'smoothedLine',
            valueField: 'ACOutputFrequency',
            fillAlphas: 0,
            fillColorsField: 'lineColor',
            balloonText: "<span>[[title]]: <b>[[value]]</b>W</span>"
          },
          {
            id: "g2",
            valueAxis: "v1",
            title: 'AC Output voltage',
            hidden: true,
            bullet: "none",
            useLineColorForBulletBorder: true,
            lineColor: "#ffd700",
            //lineColor: colorHelper.hexToRgbA("#0000ff", 0.15),
            lineThickness: 2,
            negativeLineColor: layoutColors.danger,
            type: 'smoothedLine',
            valueField: 'ACOutputVoltage',
            fillAlphas: 0,
            fillColorsField: 'lineColor',
            balloonText: "<span>[[graph2]]: <b>[[value]]</b>V</span>"
          },
          {
            id: "g3",
            valueAxis: "v0",
            title: 'Battery capacity',
            hidden: true,
            bullet: "none",
            useLineColorForBulletBorder: true,
            lineColor: "#008000",
            //lineColor: colorHelper.hexToRgbA(graphColor, 0.15),
            lineThickness: 2,
            negativeLineColor: layoutColors.danger,
            type: 'smoothedLine',
            valueField: 'BatteryCapacity',
            fillAlphas: 0,
            fillColorsField: 'lineColor',
            balloonText: "<span>[[graph3]]: <b>[[value]]</b></span>"
          },
          {
            id: "g4",
            valueAxis: "v1",
            title: 'Battery Voltage',
            bullet: "none",
            useLineColorForBulletBorder: true,
            lineColor: "#cc0000",
            //lineColor: colorHelper.hexToRgbA(graphColor, 0.3),
            lineThickness: 2,
            negativeLineColor: layoutColors.danger,
            type: 'smoothedLine',
            valueField: 'BatteryVoltage',
            fillAlphas: 0,
            fillColorsField: 'lineColor',
            balloonText: "<span>[[title]]: <b>[[value]]</b>V</span>"
          },
          {
            id: "g5",
            valueAxis: "v2",
            title: 'Charge Current Grade',
            hidden: true,
            bullet: "none",
            useLineColorForBulletBorder: true,
            lineColor: "#0000ff",
            //lineColor: colorHelper.hexToRgbA(graphColor, 0.15),
            lineThickness: 2,
            negativeLineColor: layoutColors.danger,
            type: 'smoothedLine',
            valueField: 'ChargeCurrentGrade',
            fillAlphas: 0,
            fillColorsField: 'lineColor',
            balloonText: "<span>[[title]]: <b>[[value]]</b>A</span>"
          },
          {
            id: "g6",
            valueAxis: "v4",
            title: 'Generated Energy This Day',
            hidden: true,
            bullet: "none",
            useLineColorForBulletBorder: true,
            lineColor: "#ffd700",
            //lineColor: colorHelper.hexToRgbA("#0000ff", 0.15),
            lineThickness: 2,
            negativeLineColor: layoutColors.danger,
            type: 'smoothedLine',
            valueField: 'GeneratedEnergyThisDay',
            fillAlphas: 0,
            fillColorsField: 'lineColor',
            balloonText: "<span>[[graph2]]: <b>[[value]]</b>W</span>"
          },
          {
            id: "g7",
            valueAxis: "v3",
            title: 'Load Percentage',
            hidden: true,
            bullet: "none",
            useLineColorForBulletBorder: true,
            lineColor: "#008000",
            //lineColor: colorHelper.hexToRgbA(graphColor, 0.15),
            lineThickness: 2,
            negativeLineColor: layoutColors.danger,
            type: 'smoothedLine',
            valueField: 'LoadPercentage',
            fillAlphas: 0,
            fillColorsField: 'lineColor',
            balloonText: "<span>[[graph3]]: <b>[[value]]</b>%</span>"
          },
          {
            id: "g8",
            valueAxis: "v1",
            title: 'PV Input Voltage',
            hidden: true,
            bullet: "none",
            useLineColorForBulletBorder: true,
            lineColor: "#cc0000",
            //lineColor: colorHelper.hexToRgbA(graphColor, 0.3),
            lineThickness: 2,
            negativeLineColor: layoutColors.danger,
            type: 'smoothedLine',
            valueField: 'PVInputVoltage',
            fillAlphas: 0,
            fillColorsField: 'lineColor',
            balloonText: "<span>[[title]]: <b>[[value]]</b>V</span>"
          },
          {
            id: "g9",
            valueAxis: "v2",
            title: 'PV Charge Current',
            hidden: true,
            bullet: "none",
            useLineColorForBulletBorder: true,
            lineColor: "#0000ff",
            //lineColor: colorHelper.hexToRgbA(graphColor, 0.15),
            lineThickness: 2,
            negativeLineColor: layoutColors.danger,
            type: 'smoothedLine',
            valueField: 'PVChargeCurrent',
            fillAlphas: 0,
            fillColorsField: 'lineColor',
            balloonText: "<span>[[title]]: <b>[[value]]</b>A</span>"
          },
          {
            id: "g10",
            valueAxis: "v4",
            title: 'PV Power',
            hidden: true,
            bullet: "none",
            useLineColorForBulletBorder: true,
            lineColor: "#ffd700",
            //lineColor: colorHelper.hexToRgbA("#0000ff", 0.15),
            lineThickness: 2,
            negativeLineColor: layoutColors.danger,
            type: 'smoothedLine',
            valueField: 'PVPower',
            fillAlphas: 0,
            fillColorsField: 'lineColor',
            balloonText: "<span>[[graph2]]: <b>[[value]]</b> W</span>"
          },
          {
            id: "g11",
            valueAxis: "v1",
            title: 'RatedBatteryVoltage',
            hidden: true,
            bullet: "none",
            useLineColorForBulletBorder: true,
            lineColor: "#008000",
            //lineColor: colorHelper.hexToRgbA(graphColor, 0.15),
            lineThickness: 2,
            negativeLineColor: layoutColors.danger,
            type: 'smoothedLine',
            valueField: 'RatedBatteryVoltage',
            fillAlphas: 0,
            fillColorsField: 'lineColor',
            balloonText: "<span>[[graph3]]: <b>[[value]]</b> V</span>"
          },
          {
            id: "g12",
            valueAxis: "v1",
            title: 'Rated Voltage',
            hidden: true,
            bullet: "none",
            useLineColorForBulletBorder: true,
            lineColor: "#cc0000",
            //lineColor: colorHelper.hexToRgbA(graphColor, 0.3),
            lineThickness: 2,
            negativeLineColor: layoutColors.danger,
            type: 'smoothedLine',
            valueField: 'RatedVoltage',
            fillAlphas: 0,
            fillColorsField: 'lineColor',
            balloonText: "<span>[[title]]: <b>[[value]]</b> V</span>"
          },
          {
            id: "g13",
            valueAxis: "v4",
            title: 'Temperature',
            hidden: true,
            bullet: "none",
            useLineColorForBulletBorder: true,
            lineColor: "#0000ff",
            //lineColor: colorHelper.hexToRgbA(graphColor, 0.15),
            lineThickness: 2,
            negativeLineColor: layoutColors.danger,
            type: 'smoothedLine',
            valueField: 'Temperature',
            fillAlphas: 0,
            fillColorsField: 'lineColor',
            balloonText: "<span>[[title]]: <b>[[value]]</b> W</span>"
          }
        ],
        chartCursor: {
          categoryBalloonDateFormat: 'EEE DD MMMM JJ:NN',//'JJ:NN',
          categoryBalloonColor: '#4285F4',
          categoryBalloonAlpha: 1,
          cursorAlpha: 0,
          valueLineEnabled: true,
          valueLineBalloonEnabled: true,
          valueLineAlpha: 0.5,
          fillAlpha: 0.5,
          bulletsEnabled: true
        },
        dataDateFormat: /*'DD/MM/YYYY JJ:NN',*/'DD MMMM JJ:NN',
        export: {
          enabled: true
        },
        creditsPosition: 'bottom-right',
        zoomOutButton: {
          backgroundColor: '#fff',
          backgroundAlpha: 0
        },
        zoomOutText: '',
        pathToImages: layoutPaths.images.amChart
      },

      monitorChartData: {
        type: 'serial',
        theme: 'blur',
        language: "it",
        autoMargins: false,
        marginTop: 15,
        marginRight: 15,
        marginBottom: 40,
        marginLeft: 60,
        responsive: {
          'enabled': true
        },
        dataProvider: dataCollection,
        categoryField: 'date',
        categoryAxis: {
          parseDates: true,
          minPeriod: "mm",
          gridAlpha: 0,
          color: layoutColors.defaultText,
          axisColor: layoutColors.defaultText
        },
        valueAxes: [
          {
            title: "on/off",
            integersOnly: true,
            minimum: -0.1,
            maximum: 1.1,
            //minVerticalGap: 50,
            gridAlpha: 0,
            color: layoutColors.defaultText,
            axisColor: layoutColors.defaultText,
          }
        ],
        "numberFormatter": {
          "precision": -1,
          "decimalSeparator": ",",
          "thousandsSeparator": ""
        },
        legend: {
          useGraphSettings: true,
          position: "absolute",
          top: -30,
          //autoMargins: false,
          marginLeft: 10,
          marginTop: 10,
          marginBottom: 20,
          align: "left",
          spacing: 0,
          valueAlign: "left",
          labelText: "[[title]]:",
          valueText: "[[value]]",
          equalWidths: false,
          fontSize: 11
        },
        graphs: [
          {
            id: "g0",
            title: 'ECO Mode',
            hidden: true,
            bullet: "none",
            useLineColorForBulletBorder: true,
            lineColor: "#cc0000",
            //lineColor: colorHelper.hexToRgbA(graphColor, 0.3),
            lineThickness: 2,
            negativeLineColor: layoutColors.danger,
            type: 'smoothedLine',
            valueField: 'ECOMode',
            fillAlphas: 0,
            fillColorsField: 'lineColor',
            balloonText: "<span>[[title]]: <b>[[value]]</b></span>"
          },
          {
            id: "g1",
            title: 'Green Mode',
            bullet: "none",
            useLineColorForBulletBorder: true,
            lineColor: "#0000ff",
            //lineColor: colorHelper.hexToRgbA(graphColor, 0.15),
            lineThickness: 2,
            negativeLineColor: layoutColors.danger,
            type: 'smoothedLine',
            valueField: 'GreenMode',
            fillAlphas: 0,
            fillColorsField: 'lineColor',
            balloonText: "<span>[[title]]: <b>[[value]]</b></span>"
          }
        ],
        chartCursor: {
          categoryBalloonDateFormat: 'EEE DD MMMM JJ:NN',//'JJ:NN',
          categoryBalloonColor: '#4285F4',
          categoryBalloonAlpha: 1,
          cursorAlpha: 0,
          valueLineEnabled: true,
          valueLineBalloonEnabled: true,
          valueLineAlpha: 0.5,
          fillAlpha: 0.5,
          bulletsEnabled: true
        },
        dataDateFormat: /*'DD/MM/YYYY JJ:NN',*/'DD MMMM JJ:NN',
        export: {
          enabled: true
        },
        creditsPosition: 'bottom-right',
        zoomOutButton: {
          backgroundColor: '#fff',
          backgroundAlpha: 0
        },
        zoomOutText: '',
        pathToImages: layoutPaths.images.amChart
      }
    }
  }
}