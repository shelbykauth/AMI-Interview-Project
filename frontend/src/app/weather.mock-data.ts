import { Observable, of } from 'rxjs';
import { LocationInfo, WeatherState } from './types';

/** Temporary function allowing for making the frontend visually functional before starting on backend integration */
export function getMockData(locations: LocationInfo[]): Observable<WeatherState[]> {
  let data = locations.map((location) => {
    let randomIndex = Math.floor(Math.random() * mockData.length);
    let data = mockData[randomIndex];
    console.log(randomIndex, data);
    return { ...location, ...mockData[randomIndex] };
  });
  return of(data);
}

const mockData: Omit<WeatherState, 'id' | 'city' | 'state' | 'zip'>[] = [
  {
    status: 'success',
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
    rolling12MonthTemps: [10, 20, 30, 40, 50, 60, 70, 80, 90, 110, 120],
  },
  {
    status: 'loading',
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
    rolling12MonthTemps: [10, 20, 30, 40, 50, 60, 70, 80, 90, 110, 120],
  },
  {
    status: 'error',
    temperature: -999, // unit of measurement is determined by the request payload
    windSpeed: -999, // in mph
    windDirection: -999, // degrees
    cloudCoverage: -999, // percent
    precipitation: [],
    rolling12MonthTemps: [],
  },
];
