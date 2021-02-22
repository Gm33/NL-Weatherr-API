import axios from 'axios';
import { Prediction, TimePrediction } from '../models/prediction';
import parser from 'xml2json';

const iAmsterdam = async (city: string, date: string): Promise<TimePrediction[]> => {
  const source =
    'https://gist.githubusercontent.com/dries863/864c7c4969b5ce1131f83bfed8eedc19/raw/5885645abffaa6ed73d764f9d0132c4e5c25f2b6/iamsterdam.xml';

  const response = await axios.get(source);
  if (response.data == null) return;

  // Parse XML to JSON and validate if the prediction is present.
  const parsedResponse: { predictions: Prediction } = parser.toJson(response.data, { object: true });
  if (parsedResponse?.predictions?.prediction == null) return;

  return parsedResponse.predictions.prediction;
};

export default iAmsterdam;
