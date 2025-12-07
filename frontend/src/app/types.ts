export type LocationInfo = {
  city: string;
  /** 5 digit zip-code */
  zip: string;
  /** Two-letter state code */
  state: string;
};

export type WeatherRequest = {
  /** can request multiple locations at once */
  locations: LocationInfo[];
  /** F or C for Fareinheit or Celsius.  defaults to 'F' */
  unitOfMeasurement?: 'F' | 'C';
};

export type WeatherState = LocationInfo & {
  /** Unit of measure determined by request */
  temperature: number;
  /** miles per hour */
  windSpeed: number;
  /** angle in degrees */
  windDirection: number;
  /** percent */
  cloudCoverage: number;
  /** if no precipitation, this is an empty array */
  precipitation: {
    type: 'snow' | 'rain';
    /** percent */
    probability: number;
  }[];
};

export type RollingWeatherSingle = LocationInfo & {
  /** unit of measure determined by request */
  rolling12MonthTemps: number[];
};
