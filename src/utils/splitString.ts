/**
 * The splitString function takes an input string and splits it into two separate values based on the '-' delimiter. It returns an array containing the separate values.
 *
 * Inside the function, the input string is split using the split() method, specifying '-' as the delimiter. The resulting parts are stored in the parts array.
 *
 * The function then assigns the first part to the variable day and the second part to the variable number.
 *
 * Finally, the function returns an array containing day and number as separate values.
 *
 * @param   {string[]}  input  The input string to be split.
 *
 * @return  {string[]}          An array containing the separate values.
 */
function splitString(input?: string): string[] {
  if (!input) {
    return [''];
  }
  const parts = input.split('-'); // Split the input string by '/'
  const day = parts[0]; // Get the day part
  const number = parts[1]; // Get the number part

  return [day, number]; // Return the separate values as an array
}

export { splitString };
