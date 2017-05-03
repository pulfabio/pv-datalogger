import {Component} from '@angular/core';
import {BaThemeConfigProvider, colorHelper, layoutPaths} from '../../../../theme';
import {DatepickerModule} from 'ng2-bootstrap/datepicker';
import * as moment from 'moment';
import 'moment/locale/it';

import { Subscription } from 'rxjs/Subscription';

import {BalanceService} from '../../balance.service';

import 'style-loader!./daily.scss';

@Component({
  selector: 'daily',
  templateUrl: './daily.html'
})
export class Daily {

  private errorMessage: string;
  public dt: Date;
  public chartData: any;
  public doughnutChartData: any;
  public datepickerMode: string = "day";
  public minMode: string = "day";
  public maxMode: string = "day";
  public summaryAC: number;
  public summaryGreen: number;
  public totalEnergyMoneySave: number;
  public percSummaryAC: string;
  public percSummaryGreen: string;
  private subscription: Subscription = new Subscription();
  private busy: Subscription = new Subscription();

  constructor(
    private _balanceService: BalanceService,
    private _baConfig: BaThemeConfigProvider
    ) {}

  ngOnInit() {
    moment.locale('it');
    this.getConnection();
    this.getTimeData(); //Get date
    this.getDailyBalanceData(); //Get charts data
  } //Call method at lifecycle hook OnInit.

  onChange() {
    this.getConnection();
    this.getDailyBalanceData(); //Get charts data
  } //Call method at lifecycle hook OnInit.

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.busy.unsubscribe();
  }

  getConnection() {
    this.busy = this._balanceService.getConnection().subscribe();
  }

  //Get date:
  getTimeData() {
    this._balanceService.getTimeData()
    .subscribe(
      timeData => {
        console.log("time data gotten");
        let result = this.parseTimeData(timeData);
        this.dt = result.initialDate;
        }, //Parses response
      error => this.errorMessage = <any>error
    )
  }

  parseTimeData = (data) => {
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

  getDailyBalanceData = () => {
    //Setting a fixed date in the past as APIs are not updated
    //let date = moment(this.dt).format("DD.MM.YYYY");
    let date = moment(new Date("03 apr 2016")).format("DD.MM.YYYY");
    this.subscription = this._balanceService.getDailyBalanceData(date)
    .subscribe(
      dailyBalanceData => {
        console.log("daily data gotten");
        let result = this.parseDailyBalanceData(dailyBalanceData);
        this.chartData = result.chartData;
        this.doughnutChartData = result.doughnutChartData;
        this.summaryAC = result.summaryAC;
        this.summaryGreen = result.summaryGreen;
        this.totalEnergyMoneySave = result.totalEnergyMoneySave;
        this.percSummaryAC = result.percSummaryAC;
        this.percSummaryGreen = result.percSummaryGreen;
        //this.chartData = this.parseDailyBalanceData(dailyBalanceData);
      }, //Parses response and populates charts object array
      error => this.errorMessage = <any>error
    )
  }

  private parseDailyBalanceData(data) {
    let modbus = [];
    let outputlist = [];

    let message = data.MessageError;
    let myMessages = message.split("|");

    let summaryAC = parseFloat(myMessages[0]);
    let summaryGreen = parseFloat(myMessages[1]);
    let summaryMoney = parseFloat(myMessages[2]);
    let GuadgePercent = parseFloat(myMessages[3]);

    if (isNaN(summaryAC))
      summaryAC = 0;

    if (isNaN(summaryGreen))
      summaryGreen = 0;

    if (isNaN(summaryMoney))
      summaryMoney = 0;

    if (isNaN(GuadgePercent))
      GuadgePercent = 0;

    if (isNaN(summaryMoney))
      var TotalEnergyMoneySave = 0;
    else
      TotalEnergyMoneySave = summaryMoney;

    let GaudgePercent = GuadgePercent;
    let GaudgePos = GuadgePercent;

    let percSummaryAC = (summaryAC / (summaryAC + summaryGreen) * 100).toFixed(2).toString();
    let percSummaryGreen = (summaryGreen / (summaryAC + summaryGreen) * 100).toFixed(2).toString();

    (<any>Object).entries(data.Result).forEach(([key, value]) => {
      modbus.push(value);
    });

    (<any>Object).entries(modbus[0]).forEach(([key2, value2]) => {
      outputlist.push(value2);
    });

    let dataHomeConsumptionW04 = 0;
    let GetByEnelW04 = 0;
    let dataHomeY04 = [];
    let Giorno = {};

    let  jsonHoursYear = 0;
    let  jsonHoursMonth = 0;
    let  jsonHoursDay = 0;
    let  jsonHoursHour = 0;
    let  jsonHoursMinute = 0;
    let  jsonHoursSecond = 0;

    let dataCollection = [];

    (<any>Object).entries(outputlist).forEach(([objkey, objlist]) => {
      let jsonAxisY = new Object();
      jsonAxisY = objlist["AxisY"];

      let tick = objlist["Tick"].toString();

      jsonHoursYear = tick.substring(0, 4);
      jsonHoursMonth = parseInt(tick.substring(4, 6)) - 1;
      jsonHoursDay = tick.substring(6, 8);
      jsonHoursHour = parseInt(tick.substring(8, 10));
      jsonHoursMinute = tick.substring(10, 12);
      jsonHoursSecond = tick.substring(12, 14);

      let time = new Date(jsonHoursYear, jsonHoursMonth, jsonHoursDay, jsonHoursHour, jsonHoursMinute, jsonHoursSecond);
      //let time = jsonHoursDay;

      // if (jsonHoursHour == 0)
      //   dataHomeY04.push(jsonAxisY);
      // else
      //   dataHomeY04.push((jsonHoursHour + ":00").toString());

      //jsonDATAHC.tooltext = "<b>Energia Prelevata</b> : " + objlist["TotalEnergyGreen"] + " Watt<br/>" + "Data : " + Giorno + " ore " + jsonAxisY;
      let jsonDATAHC = objlist["TotalEnergyFromAC"];
      let value = +(parseFloat(jsonDATAHC).toFixed(2)) / 1000;
      GetByEnelW04 = (Math.round(value * 100) / 100);

      //jsonDATAHC = new Object();
      jsonDATAHC = objlist["TotalEnergyGreen"];
      //jsonDATAHC.tooltext = "<b>Accumulo</b> : " + objlist["TotalEnergyFromAC"] + " Watt<br/>" + "Data : " + Giorno + " ore " + jsonAxisY;

      value = +(parseFloat(jsonDATAHC).toFixed(2)) / 1000;
      dataHomeConsumptionW04 = (Math.round(value * 100) / 100);

      dataCollection.push({
        date: time,
        get: GetByEnelW04,
        home: dataHomeConsumptionW04,
        graph0: "Energia assorbita dal fornitore",
        graph1: "Energia consumata autoprodotta"
      });

    });

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardLineChart;

    return {
      chartData: {
        type: 'serial',
        theme: 'blur',
        language: "it",
        depth3D: 20,
        angle: 30,
        autoMargins: false,
        marginTop: 15,
        marginRight: 15,
        marginBottom: 40,
        marginLeft: 50,
        responsive: {
          'enabled': true
        },
        dataProvider: dataCollection,
        categoryField: 'date',
        categoryAxis: {
          gridPosition: "start",
          axisAlpha: 0,
          position: "left",
          parseDates: true,
          minPeriod: "hh",
          gridAlpha: 0,
          color: layoutColors.defaultText,
          axisColor: layoutColors.defaultText
        },
        valueAxes: [
          {
            title: "Totale energia consumata (Wh)",
            minVerticalGap: 50,
            stackType: "regular",
            gridAlpha: 0,
            color: layoutColors.defaultText,
            axisColor: layoutColors.defaultText
          }
        ],
        legend: {
          useGraphSettings: true,
          position: "absolute",
          top: -30,
          //autoMargins: false,
          marginLeft: 10,
          marginTop: 10,
          marginBottom: 20,
          align: "left",
          spacing: 1,
          valueAlign: "left",
          labelText: "[[title]]",
          valueText: "[[value]] Wh",
          equalWidths: false,
          fontSize: 12
        },
        graphs: [
          {
            id: "g0",
            title: 'Energia assorbita dal fornitore',
            bullet: "none",
            useLineColorForBulletBorder: true,
            lineColor: "#cc0000",//"#ff6c60",
            //lineColor: colorHelper.hexToRgbA(graphColor, 0.15),
            lineThickness: 2,
            negativeLineColor: layoutColors.danger,
            type: 'column',
            valueField: 'get',
            fillAlphas: 0.8,
            lineAlpha: 0.3,
            fillColorsField: 'barColor',
            balloonText: "<span>[[category]]<br>[[graph0]]:<br><b>[[value]]</b> Wh</span>"
          },
          {
            id: "g1",
            title: 'Energia consumata autoprodotta',
            bullet: "none",
            useLineColorForBulletBorder: true,
            lineColor: "#008000", //"#a9d86e",
            //lineColor: colorHelper.hexToRgbA(graphColor, 0.15),
            lineThickness: 2,
            negativeLineColor: layoutColors.danger,
            type: 'column',
            valueField: 'home',
            fillAlphas: 0.8,
            lineAlpha: 0.3,
            fillColorsField: 'barColor',
            balloonText: "<span>[[category]]<br>[[graph1]]:<br><b>[[value]]</b> Wh</span>"
          }
        ],
        // chartCursor: {
        //   categoryBalloonDateFormat: 'EEE DD MMMM JJ:NN',//'JJ:NN',
        //   categoryBalloonColor: '#4285F4',
        //   categoryBalloonAlpha: 1,
        //   cursorAlpha: 0,
        //   valueLineEnabled: true,
        //   valueLineBalloonEnabled: true,
        //   valueLineAlpha: 0.5,
        //   fillAlpha: 0.5,
        //   bulletsEnabled: true
        // },
        dataDateFormat: 'DD MMMM',
        export: {
          enabled: true
        },
        creditsPosition: 'bottom-right',
        zoomOutButton: {
          backgroundColor: '#fff',
          backgroundAlpha: 0
        },
        zoomOutText: '',
        pathToImages: layoutPaths.images.amChart,
      }, //End of chartData

      doughnutChartData: {
        type: "pie",
        theme: "light",
        "gradientRatio": [-0.4, -0.4, -0.4, -0.4, -0.4, -0.4, 0, 0.1, 0.2, 0.1, 0, -0.2, -0.5],
        dataProvider: [ {
          title: "Assorbita",
          value: summaryAC,
          percentage: percSummaryAC,
          labelColorField: "#ffffff"
        }, {
          title: "Autoprodotta",
          value: summaryGreen,
          percentage: percSummaryGreen,
          labelColorField: "#ffffff"
        },
        {
          value: summaryAC + summaryGreen,
          alpha: 0
        } ],
        colors: [
          "#cc0000",
          "#008000"
        ],
        // "legend": {
        //   "position":"top",
        //   "autoMargins":false
        // },
        titleField: "title",
        valueField: "value",
        labelRadius: -85,
        "startAngle": 0,
        radius: "90%",
        innerRadius: "60%",
        "pieY": "95%",
        //"labelsEnabled": true,
        labelText: "[[title]]",
        balloonText: "<span>[[title]]: <b>[[percentage]]%</b> ([[value]] kWh)</span>",
        export: {
          enabled: true
        }, //End of doughnutChartData
        creditsPosition: 'bottom-right',
        responsive: {
          'enabled': true
        },
      },

      summaryAC: summaryAC,
      summaryGreen: summaryGreen,
      totalEnergyMoneySave: TotalEnergyMoneySave,
      percSummaryAC: percSummaryAC,
      percSummaryGreen: percSummaryGreen
    }
  }
}