import { Component } from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

import { WeatherService } from './weather.service';
import moment from "moment";

import 'style-loader!./weather.scss';

@Component({
  selector: 'weather',
  templateUrl: './weather.html'
})

export class Weather {

  private errorMessage: string;
  public currentDate: string;
  public currentTime: string;
  public weatherCity: string;
  public weatherCountry: string;
  public weatherDescription: string;
  public weatherTemperature: string;
  public weatherTemperatureMin: string;
  public weatherTemperatureMax: string;
  public weatherIcon: string;
  public weatherHumidity: string;
  public weatherWind: string;

  private _init = false; //Lifecycle hook ngDoCheck must be run only once

  constructor(
    private _weatherService: WeatherService,
    private _baConfig:BaThemeConfigProvider
    ) {}

  ngOnInit() {
    this.getWeatherData();
  } //Call method at lifecycle hook OnInit.

  getWeatherData() { //Get data for summary piecharts
    this._weatherService.getWeatherData()
    .subscribe(
      weatherData => {
        let result = this.parseSummary(weatherData);
        this.weatherCity = result.weatherCity;
        this.weatherCountry = result.weatherCountry;
        this.currentDate = result.currentDate;
        this.currentTime = result.currentTime;
        this.weatherDescription = result.weatherDescription;
        this.weatherTemperature = result.weatherTemperature;
        this.weatherTemperatureMin = result.weatherTemperatureMin;
        this.weatherTemperatureMax = result.weatherTemperatureMax;
        this.weatherIcon = result.weatherIcon;
        this.weatherHumidity = result.weatherHumidity;
        this.weatherWind = result.weatherWind;
        }, //Parses response
      error => this.errorMessage = <any>error
    )
  }

  private parseSummary = (data) => {
    //Parses api http response

    let datetimeweather = [];
    let outputlist = [];

    let CurrentDate = "";
    let CurrentTime = "";
    let CurrentTimePercent = {};
    let CurrentTimePercentWidth = "";

    let WeatherCity = "";
    let WeatherCountry = "";
    let WeatherTemperature = "";
    let WeatherIcon = "";
    let WeatherTemperatureMax = "";
    let WeatherTemperatureMin = "";
    let WeatherHumidity = "";
    let WeatherWind = "";
    let WeatherDescription = "";
    let WeatherDate = {};

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
          case "CurrentDate":
            var mdates = value.split(" ");
            var sdate = mdates[0];
            var mdate = mdates[1];

            var ndate;// = new Date();

            if (!moment(mdate, "DD.MM.YYYY").isValid()) {
              ndate = sdate + " " + mdate;
              CurrentDate = ndate;
            }
            else {
              ndate = moment(mdate, "ddd DD.MM.YYYY");
              CurrentDate = sdate + " " + moment(ndate).format("DD/MM/YYYY");
            }
            break;
          case "CurrentTime":
            CurrentTime = value;
            break;
          // case "CurrentTimePercent":
          //   CurrentTimePercent = value;
          //   CurrentTimePercentWidth = " width : " + CurrentTimePercent + "%";
          //   let CurrentTimePosition = " left : " + parseInt($("#x-box-tab-container").width() * CurrentTimePercent / 100);
          //   break;
          case "City":
            WeatherCity = value;
            break;
          case "Country":
            WeatherCountry = value;
            break;
          case "Temp":
            if (value == -999)
              value = "N/A";

            WeatherTemperature = value;
            break;
          case "Icon":
            WeatherIcon = value;
            break;
          case "TempMax":
            if (value == -999)
              value = "N/A";

            WeatherTemperatureMax = value;
            break;
          case "TempMin":
            if (value == -999)
              value = "N/A";

            WeatherTemperatureMin = value;
            break;
          case "Humidity":
            if (value == -999)
              value = "N/A";

             WeatherHumidity = value;
            break;
          case "WindSpeed":
            if (value == -999)
              value = "N/A";

             WeatherWind = value;
            break;
          case "Description":
            WeatherDescription = value;
            break;
          case "WeatherDate":
            WeatherDate = value;
          default:
            break;
        }
      });
    });

    return {
      currentDate: CurrentDate,
      currentTime: CurrentTime,
      weatherCity: WeatherCity,
      weatherCountry: WeatherCountry,
      weatherDescription: WeatherDescription,
      weatherTemperature: WeatherTemperature,
      weatherTemperatureMin: WeatherTemperatureMin,
      weatherTemperatureMax: WeatherTemperatureMax,
      weatherIcon: WeatherIcon,
      weatherHumidity: WeatherHumidity,
      weatherWind: WeatherWind
    }
  }
}