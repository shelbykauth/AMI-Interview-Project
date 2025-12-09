import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of, startWith, switchMap } from 'rxjs';

import { WeatherState } from './types';
import { LocationsService } from './locations';
import { WeatherService } from './weather';
import { TemperatureChartDirective } from './temperature-chart';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, TemperatureChartDirective],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly weatherService: WeatherService = inject(WeatherService);
  protected readonly title = signal('frontend');
  protected readonly locationService = inject(LocationsService);
  protected readonly refresh$ = new BehaviorSubject<void>(undefined);

  protected readonly unitOfMeasure = 'F';
  protected readonly weatherCities = toSignal(
    this.refresh$.pipe(switchMap(() => this.weatherService.getAllData())),
    { initialValue: [] }
  );

  protected readonly formControls: FormGroup = new FormGroup({
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),
  });

  addLocation() {
    this.locationService.addLocation(this.formControls.value);
  }
  removeLocation(id: string) {
    this.locationService.removeLocation(id);
  }
}
