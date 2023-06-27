/* eslint-disable prettier/prettier */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import 'mutationobserver-shim';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { store } from '../store';
import WeatherDetail from '../component/WeatherDetail';

describe('WeatherDetail', () => {
  test('renders loading state', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WeatherDetail />
        </MemoryRouter>
      </Provider>
    );

    // Assert the presence of the loading indicator
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders loading state', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WeatherDetail />
        </MemoryRouter>
      </Provider>
    );

    // Assert the presence of the loading indicator
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders data after loading state', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WeatherDetail />
        </MemoryRouter>
      </Provider>
    );

    // Assert the presence of the loading indicator
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Temperature:')).toBeInTheDocument();
    expect(screen.getByText('Precipitation Sum:')).toBeInTheDocument();
    expect(screen.getByText('Rain Sum:')).toBeInTheDocument();
    expect(screen.getByText('Date:')).toBeInTheDocument();
    expect(screen.getByText('Weather:')).toBeInTheDocument();
  });
});
