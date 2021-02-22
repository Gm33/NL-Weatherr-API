import { TimePrediction } from './prediction';

export interface City {
  name: string;
  predictions: {
    [key: string]: TimePrediction[];
  };
}
