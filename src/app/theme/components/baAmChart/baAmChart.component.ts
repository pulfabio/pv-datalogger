import {Component, ViewChild, Input, Output, ElementRef, EventEmitter} from '@angular/core';

import {BaThemePreloader} from '../../../theme/services';

import 'amcharts3';
import 'amcharts3/amcharts/plugins/responsive/responsive.js';
import 'amcharts3/amcharts/serial.js';
import 'amcharts3/amcharts/pie.js';

import 'ammap3';
import 'ammap3/ammap/maps/js/worldLow';


import {BaAmChartThemeService} from './baAmChartTheme.service';

import 'style-loader!./baAmChart.scss';

@Component({
  selector: 'ba-am-chart',
  templateUrl: './baAmChart.html',
  providers: [BaAmChartThemeService],
})
export class BaAmChart {

  @Input() baAmChartConfiguration:Object;
  @Input() baAmChartClass:string;
  @Output() onChartReady = new EventEmitter<any>();

  @ViewChild('baAmChart') public _selector:ElementRef;

  private _init = false; //Lifecycle hook ngDoCheck must be run only once

  constructor (private _baAmChartThemeService:BaAmChartThemeService) {
    this._loadChartsLib();
  }

  ngOnInit() {
    AmCharts.themes.blur = this._baAmChartThemeService.getTheme();

    //Add names of manths and days in Italian
    AmCharts.monthNames = [
      "Gennaio",
      "Febbraio",
      "Marzo",
      "Aprile",
      "Maggio",
      "Giugno",
      "Luglio",
      "Agosto",
      "Settembre",
      "Ottobre",
      "Novembre",
      "Dicembre"
    ];

    AmCharts.shortMonthNames = [
      "Gen",
      "Feb",
      "Mar",
      "Apr",
      "Mag",
      "Giu",
      "Lug",
      "Ago",
      "Set",
      "Ott",
      "Nov",
      "Dic"
    ];

    AmCharts.shortDayNames = [
      "Dom",
      "Lun",
      "Mar",
      "Mer",
      "Gio",
      "Ven",
      "Sab"
    ];
  }

  // ngAfterViewInit() {
  //   let chart = AmCharts.makeChart(this._selector.nativeElement, this.baAmChartConfiguration);
  //   this.onChartReady.emit(chart);
  // }

  //The original method ngAfterViewInit() doesn't work because when
  //it's called the config data haven't arrived from remote async call yet.
  ngOnChanges() {

    if (this.baAmChartConfiguration) {
      let chart = AmCharts.makeChart(this._selector.nativeElement, this.baAmChartConfiguration);

      //Add legend
      // let legend = new AmCharts.AmLegend();
      // chart.addLegend(legend);//, "legenddiv");
      // if (legend) {console.log("legend added")};

      this.onChartReady.emit(chart);

      this._init = true;

    };
  } //Call method at OnChanges


  private _loadChartsLib():void {
    BaThemePreloader.registerLoader(new Promise((resolve, reject) => {
      let amChartsReadyMsg = 'AmCharts ready';

      if (AmCharts.isReady) {
        resolve(amChartsReadyMsg);
      } else {
        AmCharts.ready(function () {
          resolve(amChartsReadyMsg);
        });
      }
    }));
  }
}
