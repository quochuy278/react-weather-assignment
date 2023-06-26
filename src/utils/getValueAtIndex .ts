/* eslint-disable @typescript-eslint/no-explicit-any */
/**
The getValueAtIndex function takes a data object and an index as parameters. It filters the data object based on the index, returning a new object that contains values at the specified index from each property in the original data object.

The function iterates through each entry in the data object using Object.entries. For each entry, it checks if the corresponding value is an array and if the index is within the array's bounds. If so, it assigns the value at the index to the new object's property with the same key. If not, it assigns null to the property.

Finally, the function returns the new object containing filtered values based on the index.
 *
 * @param   {any}     data   It will recieve a data object
 * @param   {number}  index  The index will represent for the day in the week
 *
 * @return  {any}            It will return a data object that was filtered depend on the index passed in from the data
 */

const getValueAtIndex = (data: any, index: number): any => {
  const values: any = {};
  Object.entries(data).forEach(([key, array]: [string, any[]]) => {
    if (Array.isArray(array) && index >= 0 && index < array.length) {
      values[key] = array[index];
    } else {
      values[key] = null;
    }
  });
  return values;
};

export { getValueAtIndex };
