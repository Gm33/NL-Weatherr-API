import axios from 'axios';
import { Prediction, TimePrediction } from '../models/prediction';

const BBC = async (city: string, date: string): Promise<TimePrediction[]> => {
  const source =
    'https://gist.githubusercontent.com/dries863/864c7c4969b5ce1131f83bfed8eedc19/raw/5885645abffaa6ed73d764f9d0132c4e5c25f2b6/bbc.json';

  const response = await axios.get<{ predictions: Prediction }>(source);

  if (response.data?.predictions?.prediction == null) return;
  return response.data.predictions.prediction;
};

export default BBC;
