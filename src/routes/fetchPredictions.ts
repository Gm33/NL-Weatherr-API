import { Request, Response } from 'express';
import { getCity } from '../services/storage';
import { getCurrentHour, isDateAllowed, isValidTimeString } from '../utils/date';
import { getTemperatureByFormat } from '../utils/temperature';

export default async (req: Request, res: Response): Promise<void> => {
  const { params } = req;

  // Check if the city is null // undefined, then return a bad request response.
  if (params.city == null || params.date == null) {
    res.sendStatus(400);
    return;
  }

  // Check if given date is valid according to the format and between the allowed scope.
  if (!isDateAllowed(params.date)) {
    res.sendStatus(400);
    return;
  }

  // If set, check if given time is valid (HH:00)
  if (params.time != null && !isValidTimeString(params.time)) {
    res.sendStatus(400);
    return;
  }

  // Check if city is available from our resources.
  const city = getCity(params.city);
  if (!city) {
    res.sendStatus(404);
    return;
  }

  // If no time has been set through the parameter, use the current time.
  const time = params.time || getCurrentHour();

  // Get the temperature from the city predictions, which is loaded from the database.
  const temperature = (city.predictions?.[params.date] || []).find((prediction) => prediction.time === time)?.value;

  // If no temperature can be found, it can probably be created with the API being only from 00:00 to 10:00 and the specified time later.
  if (temperature == null) {
    res.sendStatus(404);
    return;
  }

  res.json({
    city: city.name,
    time,
    temperature: getTemperatureByFormat(params.format, temperature)
  });

  return;
};
