import {Component} from '@angular/core';
import {BaThemeConfigProvider, colorHelper, layoutPaths} from '../../../../../theme';

import { Subscription } from 'rxjs/Subscription';

import {ChartTabsService} from '../../chartTabs.service';

import 'style-loader!./lineChart.scss';

@Component({
  selector: 'overall-chart',
  templateUrl: './lineChart.html'
})
export class OverallChart {

  private errorMessage: string;
  public chartData: any;
  private subscription: Subscription = new Subscription();
  private busy: Subscription = new Subscription();

  constructor(
    private _chartTabsService: ChartTabsService,
    private _baConfig:BaThemeConfigProvider
    ) {}

  ngOnInit() {
    this.getConnection();
    this.getRealTimeData();
  } //Call method at lifecycle hook OnInit.

  ngOnDestroy() {
    this.busy.unsubscribe();
    this.subscription.unsubscribe();
  }

  getConnection() {
    this.busy = this._chartTabsService.getConnection().subscribe();
  }

  getRealTimeData() { //Get data for charts
    this.subscription = this._chartTabsService.getRealTimeData()
    .subscribe(
      realTimeData => {
        this.chartData = this.parseRealTimeData(realTimeData);
      }, //Parses response and populates charts object array
      error => this.errorMessage = <any>error
    )
  }

  private parseRealTimeData(data): Object {
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
    let networkColor = this._baConfig.get().colors.bgThemesecondary;
    let photovoltaicColor = this._baConfig.get().colors.bgThemeprimary;
    let consumptionColor = this._baConfig.get().colors.bgGreen;
    let batteryUpColor = this._baConfig.get().colors.bgYellow;
    let batteryDownColor = this._baConfig.get().colors.bgGray;

    return {
      type: 'serial',
      theme: 'blur',
      autoMargins: false,
      marginTop: 15,
      marginRight: 15,
      marginBottom: 40,
      marginLeft: 65,
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
          axisColor: layoutColors.defaultText
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
        fontSize: 12,
        color: "#666666"
      },
      graphs: [
        {
          id: "g0",
          title: 'Energia Prelevata',
          bullet: "none",
          useLineColorForBulletBorder: true,
          lineColor: networkColor, //"#cc0000"
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
          lineColor: batteryUpColor, //"#0000ff",
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
          lineColor: photovoltaicColor, //"#ffd700",
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
          lineColor: consumptionColor, //"#008000",
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

  initChart(chart:any) {
    let zoomChart = () => {
      chart.zoomToIndexes(0, this.chartData.dataProvider.length);
      //chart.zoomToDates(new Date(2013, 3), new Date(2014, 0));
    };

    chart.addListener('rendered', zoomChart);
    zoomChart();

    if (chart.zoomChart) {
      chart.zoomChart();
    }
  }
}
