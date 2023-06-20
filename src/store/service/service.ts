// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.REACT_APP_WEATHER_API,
  }),
  endpoints: (builder) => ({}),
});

export const {} = weatherApi;
