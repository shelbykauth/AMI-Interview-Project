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

const mockData: Omit<WeatherState, 'city' | 'state' | 'zip'>[] = [
  {
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
