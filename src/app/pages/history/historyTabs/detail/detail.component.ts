import {Component} from '@angular/core';
import {BaThemeConfigProvider, colorHelper, layoutPaths} from '../../../../theme';
import {DatepickerModule} from 'ng2-bootstrap/datepicker';
import * as moment from 'moment';
import 'moment/locale/it';

import { Subscription } from 'rxjs/Subscription';

import {HistoryService} from '../../history.service';

import 'style-loader!./detail.scss';

@Component({
  selector: 'detail',
  templateUrl: './detail.html'
})
export class Detail {

  private errorMessage: string;
  public dt: Date;
  public chartData: any;
  public datepickerMode: string = "day";
  public minMode: string = "day";
  public maxMode: string = "day";
  private subscription: Subscription = new Subscription();
  private busy: Subscription = new Subscription();

  constructor(
    private _historyService: HistoryService,
    private _baConfig: BaThemeConfigProvider
    ) {}

  ngOnInit() {
    moment.locale('it');
    this.getConnection();
    this.getTimeData(); //Get date
    this.getDetailData(); //Get charts data
  } //Call method at lifecycle hook OnInit.

  // ngOnChanges() {
  //   console.log(this.dt);
  //   this.getMonthlyBalanceData(); //Get charts data
  // } //Call method at lifecycle hook OnInit.

  onChange() {
    this.getConnection();
    this.getDetailData(); //Get charts data
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.busy.unsubscribe();
  }

  getConnection() {
    this.busy = this._historyService.getConnectionDetail().subscribe();
  }

  //Get date:
  getTimeData() {
    this._historyService.getTimeData()
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
    this.subscription = this._historyService.getDetailData(date)
    .subscribe(
      detailData => {
        //let result = this.parseRealTimeData(realTimeData);
        this.chartData = this.parseDetailData(detailData);
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

    let dataHomeConsumptionW04 = [];
    let GetByEnelW04 = [];
    let StoredEnergyW04 = [];
    let PVEnergyW04 = [];
    let dataHomeY04 = [];
    let Giorno = {};

    let jsonHoursYear = 0;
    let jsonHoursMonth = 0;
    let jsonHoursDay = 0;
    let jsonHoursHour = 0;
    let jsonHoursMinute = 0;
    let jsonHoursSecond = 0;

    let dataCollection = [];

    (<any>Object).entries(outputlist).forEach(([objkey, objlist]) => {

      let jsonAxisY = new Object();
      jsonAxisY = objlist["AxisYToolTip"];

      let tick = objlist["Tick"].toString();

      jsonHoursYear = tick.substring(0, 4);
      jsonHoursMonth = (tick.substring(4, 6)) - 1;
      jsonHoursDay = tick.substring(6, 8);
      jsonHoursHour = tick.substring(8, 10);
      jsonHoursMinute = tick.substring(10, 12);
      jsonHoursSecond = tick.substring(12, 14);

      dataHomeY04.push(objlist["AxisY"]);

      let time = new Date(jsonHoursYear, jsonHoursMonth, jsonHoursDay, jsonHoursHour, jsonHoursMinute, jsonHoursSecond);
      let getByEnelW = objlist["GetByEnelW"];
      let storedEnergyW = objlist["StoredEnergyW"];
      let pVEnergyW = objlist["PVEnergyW"];
      let homeConsumptionW = objlist["HomeConsumptionW"];

      dataCollection.push({
        date: time,
        get: getByEnelW,
        stored: storedEnergyW,
        pv: pVEnergyW,
        home: homeConsumptionW,
        graph0: "Energia Prelevata",
        graph1: "Accumulo",
        graph2: "Produzione Fotovoltaico",
        graph3: "Consumo Casa"
      })

    });

    var layoutColors = this._baConfig.get().colors;
    var graphColor = this._baConfig.get().colors.custom.dashboardLineChart;

    return {
      type: 'serial',
      theme: 'blur',
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
          //title: "watt",
          unit: "W",
          minVerticalGap: 50,
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
        valueText: "[[value]] W",
        equalWidths: false,
        fontSize: 11
      },
      graphs: [
        {
          id: "g0",
          title: 'Energia Prelevata',
          bullet: "none",
          useLineColorForBulletBorder: true,
          lineColor: "#cc0000",
          //lineColor: colorHelper.hexToRgbA(graphColor, 0.3),
          lineThickness: 2,
          negativeLineColor: layoutColors.danger,
          type: 'smoothedLine',
          valueField: 'get',
          fillAlphas: 0,
          fillColorsField: 'lineColor',
          balloonText: "<span>[[graph0]]: <b>[[value]]</b> W</span>"
        },
        {
          id: "g1",
          title: 'Accumulo',
          bullet: "none",
          useLineColorForBulletBorder: true,
          lineColor: "#0000ff",
          //lineColor: colorHelper.hexToRgbA(graphColor, 0.15),
          lineThickness: 2,
          negativeLineColor: layoutColors.danger,
          type: 'smoothedLine',
          valueField: 'stored',
          fillAlphas: 0,
          fillColorsField: 'lineColor',
          balloonText: "<span>[[graph1]]: <b>[[value]]</b> W</span>"
        },
        {
          id: "g2",
          title: 'Prod. Fotovoltaico',
          bullet: "none",
          useLineColorForBulletBorder: true,
          lineColor: "#ffd700",
          //lineColor: colorHelper.hexToRgbA("#0000ff", 0.15),
          lineThickness: 2,
          negativeLineColor: layoutColors.danger,
          type: 'smoothedLine',
          valueField: 'pv',
          fillAlphas: 0,
          fillColorsField: 'lineColor',
          balloonText: "<span>[[graph2]]: <b>[[value]]</b> W</span>"
        },
        {
          id: "g3",
          title: 'Consumo Casa',
          bullet: "none",
          useLineColorForBulletBorder: true,
          lineColor: "#008000",
          //lineColor: colorHelper.hexToRgbA(graphColor, 0.15),
          lineThickness: 2,
          negativeLineColor: layoutColors.danger,
          type: 'smoothedLine',
          valueField: 'home',
          fillAlphas: 0,
          fillColorsField: 'lineColor',
          balloonText: "<span>[[graph3]]: <b>[[value]]</b> W</span>"
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
      pathToImages: layoutPaths.images.amChart,
    }
  }
}