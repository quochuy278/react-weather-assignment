import { createSlice } from '@reduxjs/toolkit';

export interface weatherState {
  temperatureUnit: string;
}

const initialState: weatherState = {
  temperatureUnit: 'celsius', // or fahrenheit
};

export const weatherSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = weatherSlice.actions;
