export interface Prediction {
  city: string;
  scale: string;
  date: string;
  prediction: TimePrediction[];
}

export interface TimePrediction {
  time: string;
  value: number;
}

/**
 * How predictions are loaded from the sources.
 */
export interface PredictionSource {
  predictions: Prediction;
}

/**
 * How predictions are stored in the database.
 */
export interface StoragePredictions {
  [key: string]: TimePrediction[];
}
