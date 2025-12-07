import { of } from 'rxjs';
import { WeatherState } from './types';

/** Temporary function allowing for making the frontend visually functional before starting on backend integration */
export function getMockData() {
  return of(mockData);
}

const mockData: WeatherState[] = [
  {
    city: 'Dearborn',
    zip: '48124',
    state: 'MI',
    temperature: 100, // unit of measurement is determined by the request payload
    windSpeed: 10, // in mph
    windDirection: 25.5, // degrees
    cloudCoverage: 0.5, // percent
    precipitation: [
      {
        type: 'snow',
        probability: 0.5, // percent
      },
    ],
  },
  {
    city: 'Romulus',
    zip: '48174',
    state: 'MI',
    temperature: 102, // unit of measurement is determined by the request payload
    windSpeed: 13, // in mph
    windDirection: -25.5, // degrees
    cloudCoverage: 0.1, // percent
    precipitation: [
      {
        type: 'snow',
        probability: 0.1, // percent
      },
    ],
  },
];
