// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import moment from 'moment';

// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.REACT_APP_WEATHER_API,
  }),
  endpoints: (builder) => ({
    fetchWeatherForcastHourly: builder.query<unknown, string>({
      query: (query: string) => ({
        method: 'GET',
        url: `forecast?latitude=65.01&longitude=25.50${query}`,
      }),
      transformResponse: (response: any) => {
        const chunkArray = (array: any[], chunkSize: number): any[] => {
          const chunks = [];
          for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
          }
          return chunks;
        };

        const timeChunks = chunkArray(response.hourly.time, 24);
        const temperatureChunks = chunkArray(
          response.hourly.temperature_2m,
          24
        );

        const transformedData = {
          ...response,
          time: timeChunks,
          temperature_2m: temperatureChunks,
        };

        return transformedData;
      },
    }),
    fetchWeatherForcast: builder.query<unknown, string>({
      query: (query: string) => ({
        method: 'GET',
        url: `forecast?latitude=65.01&longitude=25.50${query}`,
      }),
      transformResponse: (response: any) => {
        const currentIndex = moment().weekday();
        const adjustedMondayIndex = (currentIndex + 6) % 7;
        const rearrangedDaily: unknown = {};

        for (const key in response.daily) {
          rearrangedDaily[key] = [
            ...response.daily[key].slice(adjustedMondayIndex),
            ...response.daily[key].slice(0, adjustedMondayIndex),
          ];
        }

        const rearrangedData = {
          ...response,
          daily: rearrangedDaily,
        };

        return rearrangedData;
      },
    }),
  }),
});

export const {
  useFetchWeatherForcastQuery,
  useFetchWeatherForcastHourlyQuery,
} = weatherApi;
