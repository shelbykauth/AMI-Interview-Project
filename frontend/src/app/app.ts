import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

import { WeatherService } from './weather';
import { WeatherState } from './types';
import { AddLocationForm } from './add-location-form/add-location-form';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, AddLocationForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly weatherService: WeatherService = inject(WeatherService);
  protected readonly title = signal('frontend');
  protected readonly unitOfMeasure = 'F';
  protected readonly weatherCities: Observable<WeatherState[]> = this.weatherService.getData();
}
