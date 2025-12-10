import { Component, inject, input } from '@angular/core';
import { WeatherState } from '../types';
import { LocationsService } from '../locations';
import { SkeletonLoader } from '../skeleton-loader';

@Component({
  selector: 'div[app-weather-card]',
  imports: [SkeletonLoader],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.css',
  host: {
    class: 'card relative rounded-2xl border-2 m-1 p-2 w-sm',
  },
})
export class WeatherCard {
  protected readonly locationsService = inject(LocationsService);
  weatherState = input<WeatherState>();
  unitOfMeasure = input('F');
}
