import { Component, OnInit } from '@angular/core';
import { Weather } from './weather';
import { WeatherdataService } from '../weatherdata.service';
import { Observable } from 'rxjs';
import { windDirection } from './helpers';

@Component({
  selector: 'app-wilmington',
  templateUrl: './wilmington.component.html',
  styleUrls: ['./location.component.css'],
})
export class WilmingtonComponent implements OnInit {
  cityChosen: boolean = false;
  city: string = 'Wilmington, NC';
  imgSrc: string = '"../../assets/images/wilmington.jpg'
  rightNow: Date = new Date();
  zip: string = "28401,us";
  iconSrc: string = 'http://openweathermap.org/img/w/'
  icon: string;
  currentTemp: number;
  high: number;
  low: number;
  desc: string;
  currHumidity: number;
  baroPressure: number;
  cloudCover: number;
  winds: number;
  windDir: string;
  sunrise: number;
  sunset: number;

  constructor(private _weatherdataService: WeatherdataService) { }

  ngOnInit() {
    this.cityChosen = true;
    this._weatherdataService.getWeather(this.zip)
      .subscribe(data => {
        console.log(data)
        this.icon = this.iconSrc + data.weather[0].icon + '.png';
        this.currentTemp = data.main.temp;
        this.high = data.main.temp_max;
        this.low = data.main.temp_min;
        this.desc = data.weather[0].description;
        this.currHumidity = data.main.humidity;
        this.baroPressure = data.main.pressure/33.863886666667;
        this.cloudCover = data.clouds.all;
        this.winds = data.wind.speed;
        this.windDir = windDirection(data.wind.deg);
        this.sunrise = data.sys.sunrise * 1000;
        this.sunset = data.sys.sunset * 1000;
      })
  }

}