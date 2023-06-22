/* eslint-disable prettier/prettier */
import moment from 'moment';

function getWeekDays(): string[] {
  const days: string[] = [];
  // Get the index of the current day in the week
  const currentIndex = moment().day(); // 4

  // Calculate the adjusted index for Monday
  const adjustedMondayIndex = ((currentIndex + 6) % 7) - 2;

  // Iterate from 0 to 6 to get the next seven days
  for (let i = 0; i < 7; i++) {
    // Calculate the index of the next day based on the adjusted Monday index
    const nextIndex = (adjustedMondayIndex + i) % 7;
    // Get the name of the next day based on the index
    const nextDay = moment().day(nextIndex).format('dddd');
    // Push the next day to the result array
    days.push(nextDay);
  }

  return days;
}

export { getWeekDays };
