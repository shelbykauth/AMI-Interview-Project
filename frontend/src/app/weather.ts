import { inject, Injectable } from '@angular/core';

import { getMockData } from './weather.mock-data';
import { LocationInfo } from './types';
import { LocationsService } from './locations';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  protected readonly locationsService = inject(LocationsService);
  getData(locationInfo: LocationInfo[]) {
    // TODO: get data from backend API
    return getMockData(locationInfo);
  }
  getAllData() {
    let locations = this.locationsService.locations$;
    return locations.pipe(switchMap((locationInfo) => this.getData(locationInfo)));
  }
}
