import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';

import { WeatherState } from './types';
import { LocationsService } from './locations';
import { WeatherService } from './weather';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly weatherService: WeatherService = inject(WeatherService);
  protected readonly title = signal('frontend');
  protected readonly locationService = inject(LocationsService);
  protected readonly refresh$ = new BehaviorSubject<void>(undefined);

  protected readonly unitOfMeasure = 'F';
  protected readonly weatherCities: Observable<WeatherState[]> = this.refresh$.pipe(
    switchMap(() => this.weatherService.getAllData())
  );

  protected readonly formControls: FormGroup = new FormGroup({
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),
  });

  addLocation() {
    this.locationService.addLocation(this.formControls.value);
  }
}
