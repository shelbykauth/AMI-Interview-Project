import { inject, Injectable } from '@angular/core';

import { getMockData } from './weather.mock-data';
import { LocationInfo, WeatherState } from './types';
import { LocationsService } from './locations';
import { switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  protected readonly locationsService = inject(LocationsService);
  protected readonly httpClient = inject(HttpClient);
  getData(locationInfo: LocationInfo[]) {
    // TODO: get data from backend API
    return this.httpClient.post<WeatherState[]>('http://localhost:5046/weatherforecast/', {
      locations: locationInfo,
      unitofMeasurement: 'F',
    });
    // return getMockData(locationInfo);
  }
  getAllData() {
    let locations = this.locationsService.locations$;
    return locations.pipe(switchMap((locationInfo) => this.getData(locationInfo)));
  }
}
