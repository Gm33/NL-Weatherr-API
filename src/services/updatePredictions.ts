import { getDatesToUpdate } from '../utils/date';
import BBC from '../sources/BBC';
import iAmsterdam from '../sources/iAmsterdam';
import WeatherCom from '../sources/WeatherCom';
import { getCityNames, updateCityPredictions } from './storage';
import { roundTemperature } from '../utils/temperature';

const predictionSources = [BBC, iAmsterdam, WeatherCom];

export default async (cronTask) => {
  const datesToUpdate = getDatesToUpdate();
  const cities = getCityNames();

  // If no cities are available in storage, cancel job.
  if (cities?.length === 0) {
    cronTask.stop();
    return;
  }

  // Loop through each city and for every date from today until the max future day.
  for (const city of cities) {
    const averageTemperatures = {};
    for (const date of datesToUpdate) {
      const predictions = [];

      // Fetch predictions from all sources for all cities and dates.
      for (const predictionSource of predictionSources) {
        const response = await predictionSource(city, date);
        if (response) predictions.push(response);
      }

      if (predictions[0] == null) continue;

      averageTemperatures[date] = [];

      // Calculate average for each time from all sources.
      for (let i = 0; i < predictions[0].length; i++) {
        // Sum values of each prediction
        let sum = 0;
        predictions.forEach((prediction) => {
          sum += parseInt(prediction[i].value, 10);
        });
        // Calculate average
        averageTemperatures[date].push({
          time: predictions[0][i].time,
          value: roundTemperature(sum / predictions.length)
        });
      }
    }
    await updateCityPredictions(city, averageTemperatures);
  }
};
