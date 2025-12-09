import { Injectable } from '@angular/core';

import { LocationInfo } from './types';
import { BehaviorSubject, buffer } from 'rxjs';

export async function calculateId(info: LocationInfo) {
  let infoString = `${info.city}_${info.state}_${info.zip}`.toLowerCase().replaceAll(/\W/g, '');
  return infoString;
  // // Todo: Determine if the following is useful.
  // try {
  //   let buffer = new TextEncoder().encode(infoString);
  //   let digest = await crypto.subtle.digest('SHA-256', buffer);
  //   const resultBytes = [...new Uint8Array(digest)];
  //   return resultBytes.map((x) => x.toString(16).padStart(2, '0')).join('');
  // } catch (err) {
  //   console.error(err);
  //   return infoString;
  // }
}

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

  async addLocation(info: LocationInfo) {
    info.id = await calculateId(info);
    let list = this._locations$.value;
    if (list.some((item) => item.id === info.id)) {
      throw new Error('Cannot add the same Location twice.');
    }
    list.push(info);
    this._saveStoredLocations(list);
  }
  removeLocation(id: string) {
    let list = this._locations$.value.filter((item) => item.id !== id);
    this._saveStoredLocations(list);
  }

  private _verifyIsLocation(info: LocationInfo | any) {
    if (!info) {
      return false;
    }
    if (!info.id) {
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
