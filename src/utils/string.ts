/**
 * Function to capitalize first character of a string.
 * @param text to be processed.
 */
export const capitalizeFirstLetter = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);
