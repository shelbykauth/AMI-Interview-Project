import { AsyncPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of, startWith, switchMap, tap } from 'rxjs';

import { LocationInfo, WeatherState } from './types';
import { LocationsService } from './locations';
import { WeatherService } from './weather';
import { TemperatureChartDirective } from './temperature-chart';
import { toSignal } from '@angular/core/rxjs-interop';
import { WeatherCard } from './weather-card/weather-card';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, TemperatureChartDirective, WeatherCard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly weatherService: WeatherService = inject(WeatherService);
  protected readonly title = signal('frontend');
  protected readonly locationService = inject(LocationsService);
  protected readonly refresh$ = new BehaviorSubject<void>(undefined);

  protected readonly unitOfMeasure = 'F';
  protected readonly weatherCitiesRaw = toSignal(
    this.refresh$.pipe(switchMap(() => this.weatherService.getAllData())),
    { initialValue: [] }
  );

  protected readonly weatherCities = computed(() => {
    let cards = this.weatherCitiesRaw();
    if (typeof cards === 'string') {
      return [];
    } else {
      return cards;
    }
  });
  protected readonly generalErrorMessage = computed(() => {
    let errorMessage = this.weatherCitiesRaw();
    if (typeof errorMessage === 'string') {
      return errorMessage;
    } else {
      return null;
    }
  });

  protected readonly formControls = new FormGroup({
    id: new FormControl('', { nonNullable: true }),
    city: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/[a-zA-z]+/)],
    }),
    state: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[a-zA-Z]{2}$/)],
    }),
    zip: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[0-9]{5}$/)],
    }),
  });

  protected readonly formValueChanges = toSignal(this.formControls.valueChanges);

  protected readonly formErrorMesages = computed(() => {
    this.formValueChanges();
    let cityErrors = this.formControls.controls.city.errors;
    let stateErrors = this.formControls.controls.state.errors;
    let zipErrors = this.formControls.controls.zip.errors;

    let errorMessages = {
      city: '',
      state: '',
      zip: '',
    };
    if (cityErrors && this.formControls.controls.city.dirty) {
      if (cityErrors['required']) {
        errorMessages.city = 'Error: Required';
      } else if (cityErrors['pattern']) {
        errorMessages.city = 'Error: Text must not be empty';
      }
    }
    if (stateErrors && this.formControls.controls.state.dirty) {
      if (stateErrors['required']) {
        errorMessages.state = 'Error: Required';
      } else if (stateErrors['pattern']) {
        errorMessages.state = 'Error: State must be the 2-letter state code, eg: "MI"';
      }
    }
    if (zipErrors && this.formControls.controls.zip.dirty) {
      if (zipErrors['required']) {
        errorMessages.zip = 'Error: Required';
      } else if (zipErrors['pattern']) {
        errorMessages.zip = 'Error: Zip must be the 5-digit zip code, eg: "48124"';
      }
    }

    return errorMessages;
  });

  addLocation() {
    this.locationService.addLocation(this.formControls.getRawValue());
    this.formControls.reset();
  }
  removeLocation(id: string) {
    this.locationService.removeLocation(id);
  }
}
