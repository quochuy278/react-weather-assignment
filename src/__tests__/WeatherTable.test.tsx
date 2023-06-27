import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import 'mutationobserver-shim';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import WeatherTable from '../component/WeatherTable';
import { store } from '../store';

describe('WeatherTable', () => {
  test('renders loading state', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WeatherTable />
        </MemoryRouter>
      </Provider>
    );

    // Assert the presence of the loading indicator
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders WeatherTable without errors after loading', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WeatherTable />
        </MemoryRouter>
      </Provider>
    );

    // Wait for the loading state to finish
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    // Continue with your assertions or actions
    expect(screen.getByText('Monday')).toBeInTheDocument();
  });

  test('fetches and displays weather data', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WeatherTable />
        </MemoryRouter>
      </Provider>
    );

    // Wait for the data to be loaded
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    // Assert that the weather data is displayed
    expect(screen.getByText('Temperature 2m Max')).toBeInTheDocument();
    expect(screen.getByText('Temperature 2m Min')).toBeInTheDocument();
    expect(screen.getByText('Apparent Temperature Max')).toBeInTheDocument();
    expect(screen.getByText('Apparent Temperature Min')).toBeInTheDocument();
    expect(screen.getByText('Precipitation Sum')).toBeInTheDocument();
    expect(screen.getByText('Rain Sum')).toBeInTheDocument();
    expect(screen.getByText('Weathercode')).toBeInTheDocument();
  });
});
