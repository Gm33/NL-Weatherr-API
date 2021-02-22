import FileSync from 'lowdb/adapters/FileSync';
import { City } from '../models/city';
import { capitalizeFirstLetter } from '../utils/string';
import { StoragePredictions } from '../models/prediction';
import low from 'lowdb';
import { Config } from '../config';

const adapter = new FileSync(Config.DATABASE_FILE, {
  serialize: (obj) => JSON.stringify(obj)
});
const db = low(adapter);

/**
 * Get a list of all available city names
 */
export const getCityNames = (): string[] => {
  return db.get('cities').map('name').value();
};

/**
 * Get a single city by name
 * @param city, name of the city
 */
export const getCity = (city: string): City => {
  return db
    .get('cities')
    .find({ name: capitalizeFirstLetter(city) })
    .value();
};

/**
 * Update the predictions of a city
 * @param city the name of the city
 * @param predictions an object in the form of a StoragePredictions interface to be used as prediction value
 */
export const updateCityPredictions = (city: string, predictions: StoragePredictions): void => {
  return db.get('cities').find({ name: city }).assign({ predictions }).write();
};
