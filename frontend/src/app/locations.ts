import { Injectable } from '@angular/core';

import { LocationInfo } from './types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private readonly _locations$ = new BehaviorSubject<LocationInfo[]>([]);
  public readonly locations$ = this._locations$.asObservable();

  addLocation(info: LocationInfo) {}
}
