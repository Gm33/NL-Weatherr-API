import axios from 'axios';
import { Prediction, PredictionSource, TimePrediction } from '../models/prediction';
import { fahrenheitToCelsius } from '../utils/temperature';

const WeatherCom = async (city: string, date: string): Promise<TimePrediction[]> => {
  const source =
    'https://gist.githubusercontent.com/dries863/864c7c4969b5ce1131f83bfed8eedc19/raw/5885645abffaa6ed73d764f9d0132c4e5c25f2b6/weather.com.json';

  const response = await axios.get<PredictionSource>(source);
  if (response.data?.predictions?.prediction == null) return;

  // Convert fahrenheit to celsius.
  const convertedResponse = response.data.predictions.prediction.map((prediction: TimePrediction) => {
    return {
      time: prediction.time,
      value: fahrenheitToCelsius(prediction.value)
    };
  });

  return convertedResponse;
};

export default WeatherCom;
