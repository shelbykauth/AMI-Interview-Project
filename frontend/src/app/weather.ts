import { inject, Injectable } from '@angular/core';

import { getMockData } from './weather.mock-data';
import { LocationInfo, WeatherState } from './types';
import { LocationsService } from './locations';
import { switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export function takeAverage(arr: number[]) {
  const count = arr.length;
  const sum = arr.reduce((prev, curr) => prev + curr, 0);
  const avgRaw = sum / count;
  return Math.round(avgRaw * 10) / 10;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  protected readonly locationsService = inject(LocationsService);
  protected readonly httpClient = inject(HttpClient);
  getData(locationInfo: LocationInfo[]) {
    return this.httpClient
      .post<WeatherState[]>('http://localhost:5046/weatherforecast/', {
        locations: locationInfo,
        unitofMeasurement: 'F',
      })
      .pipe(
        tap((data) =>
          data.forEach((item) => (item.rolling12MonthAvg = takeAverage(item.rolling12MonthTemps)))
        )
      );
  }
  getAllData() {
    let locations = this.locationsService.locations$;
    return locations.pipe(switchMap((locationInfo) => this.getData(locationInfo)));
  }
}
