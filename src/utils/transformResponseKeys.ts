/* eslint-disable prettier/prettier */
function transformResponseKey(key: string): string {
  const formattedKey = key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return formattedKey;
}

export { transformResponseKey };
