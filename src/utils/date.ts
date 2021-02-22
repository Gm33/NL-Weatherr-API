import moment from 'moment';
import { Config } from '../config';

/**
 * Function to check if the given date is valid, and between today and in max 10 days.
 * @param date
 */
export const isDateAllowed = (date): boolean => {
  const parsedDate = moment(date, Config.DATE_FORMAT);
  if (!parsedDate.isValid()) return false;

  const today = moment().startOf('day');
  const maxDay = moment().endOf('day').add(Config.MAX_FUTURE_DAYS, 'days');
  const isDatePeriodValid = parsedDate.isBetween(today, maxDay, undefined, '[]');
  return isDatePeriodValid;
};

/**
 * Gets an array of dates from today until today + max future days (10).
 */
export const getDatesToUpdate = () => {
  const dateArray = [];
  let today = moment().startOf('day');
  const endDate = moment().endOf('day').add(Config.MAX_FUTURE_DAYS, 'days');
  while (today <= endDate) {
    dateArray.push(moment(today).format(Config.DATE_FORMAT));
    today = moment(today).add(1, 'days');
  }
  return dateArray;
};

/**
 * Validate if given string is HH:00 format
 * @param timeString to check
 */
export const isValidTimeString = (timeString) => /^([01]?[0-9]|2[0-3]):00$/.test(timeString);

/**
 * Get the current time in format HH:00
 */
export const getCurrentHour = () => `${moment().format('HH')}:00`;
