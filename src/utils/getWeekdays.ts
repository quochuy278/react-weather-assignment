/* eslint-disable prettier/prettier */
import moment from 'moment';

/**
 * The getWeekDays function retrieves an array of week day names starting from the current day. It uses the moment library to handle date and time operations.
 *
 * The function initializes an empty array called days. It then calculates the index of the current day in the week using moment().day(). The adjusted Monday index is calculated by adding 6 to the current index, taking the modulus of 7, and adding 1.
 *
 * A loop is used to iterate from 0 to 6 to get the next seven days. For each iteration, the function calculates the index of the next day by adding the adjusted Monday index and the current iteration index, taking the modulus of 7. It then uses moment().day(nextIndex) to get the corresponding day's name in the format 'dddd' (e.g., 'Monday', 'Tuesday'). The day name is pushed to the days array.
 *
 * Finally, the function returns the days array containing the week day names.
 *
 * @return  {string[]}[return description]
 */
function getWeekDays(): string[] {
  const days: string[] = [];

  const currentIndex = moment().day();

  const adjustedMondayIndex = ((currentIndex + 6) % 7) + 1;

  for (let i = 0; i < 7; i++) {
    const nextIndex = (adjustedMondayIndex + i) % 7;

    const nextDay = moment().day(nextIndex).format('dddd');

    days.push(nextDay);
  }

  return days;
}

export { getWeekDays };
