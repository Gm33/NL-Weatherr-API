/**
 * Utils to convert celcius from / to fahrenheit.
 */

export const roundTemperature = (temperature: number): number => Math.round(temperature * 10) / 10;

export const fahrenheitToCelsius = (fahrenheit: number): number => ((fahrenheit - 32) * 5) / 9;

// Methods used for converting celsius to another format.
export const celsiusToFahrenheit = (celsius: number): number => (celsius * 9) / 5 + 32;
export const celsiusToKelvin = (celsius: number): number => celsius + 273.15;
export const celsiusToRankine = (celsius: number): number => ((celsius + 273.15) * 9) / 5;
export const celsiusToDelisle = (celsius: number): number => ((100 - celsius) * 3) / 2;
export const celsiusToNewton = (celsius: number): number => celsius * 0.33;
export const celsiusToReaumur = (celsius: number): number => celsius * 0.8;
export const celsiusToRomer = (celsius: number): number => (celsius * 0.8) / 40 + 7.5;

/**
 * Return temperature for certain format, default is celsius.
 * @param requested format
 * @param temperature which has to be transformed.
 */
export const getTemperatureByFormat = (format: string, temperature: number): number => {
  switch (format) {
    case 'kelvin':
      return celsiusToKelvin(temperature);
    case 'rankine':
      return celsiusToRankine(temperature);
    case 'delisle':
      return celsiusToDelisle(temperature);
    case 'newton':
      return celsiusToNewton(temperature);
    case 'reaumur':
      return celsiusToReaumur(temperature);
    case 'romer':
      return celsiusToRomer(temperature);
    case 'fahrenheit':
      return celsiusToFahrenheit(temperature);
    case 'celsius':
    default:
      return temperature;
  }
};
