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
    fetchWeatherForcast: builder.query<unknown, string>({
      query: (query: string) => ({
        method: 'GET',
        url: `forecast?latitude=65.01&longitude=25.50${query}`,
      }),
      transformResponse: (response: any) => {
        const currentIndex = moment().weekday();
        const adjustedMondayIndex = ((currentIndex + 6) % 7) + 1;
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
        console.log(rearrangedData);
        return rearrangedData;
      },
    }),
  }),
});

export const { useFetchWeatherForcastQuery } = weatherApi;
