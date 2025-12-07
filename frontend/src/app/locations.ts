import { Injectable } from '@angular/core';

import { LocationInfo } from './types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private readonly storageKey = 'WEATHER_APP__WEATHER_LOCATIONS';

  private readonly _locations$ = new BehaviorSubject<LocationInfo[]>([]);
  public readonly locations$ = this._locations$.asObservable();

  constructor() {
    this._getStoredLocations();
  }

  addLocation(info: LocationInfo) {
    let list = this._locations$.value;
    list.push(info);
    this._saveStoredLocations(list);
  }

  private _verifyIsLocation(info: LocationInfo | any) {
    if (!info) {
      return false;
    }
    if (!info.city) {
      return false;
    }
    if (!info.state) {
      return false;
    }
    if (!info.zip) {
      return false;
    }
    return true;
  }
  private _verifyIsLocationArray(list: LocationInfo[]) {
    if (!(list instanceof Array)) {
      console.error('Stored Locations is not array');
    }
    const everyItemIsLocation = list.every((location) => this._verifyIsLocation(location));
    return everyItemIsLocation;
  }

  private _getStoredLocations() {
    const json = window.localStorage.getItem(this.storageKey) ?? '[]';
    let output: LocationInfo[] = JSON.parse(json);
    if (!this._verifyIsLocationArray(output)) {
      output = [];
      this._saveStoredLocations(output);
    }
    this._locations$.next(output);
    return output;
  }

  private _saveStoredLocations(list: LocationInfo[]) {
    this._locations$.next(list);
    const json = JSON.stringify(list);
    console.log(list);
    console.log(json);
    window.localStorage.setItem(this.storageKey, json);
  }
}
