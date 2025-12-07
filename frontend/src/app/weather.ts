import { Injectable } from '@angular/core';

import { getMockData } from './weather.mock-data';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  getData(locationInfo?: any) {
    // TODO: get data from backend API
    return getMockData();
  }
}
