/* eslint-disable prettier/prettier */
/**
 * Transforms a response key by replacing underscores with spaces and capitalizing the first letter of each word.
 *
 * @param {string} key - The response key to be transformed.
 * @returns {string} - The transformed key.
 */

function transformResponseKey(key: string): string {
  // Replace underscores with spaces using regular expression
  const formattedKey = key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());  // Capitalize the first letter of each word

  return formattedKey;
}

export { transformResponseKey };
