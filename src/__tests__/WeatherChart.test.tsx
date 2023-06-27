import React from 'react';
import { Provider } from 'react-redux';
import WeatherChart from '../component/WeatherChart';
import { MemoryRouter } from 'react-router';
import { store } from '../store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import 'mutationobserver-shim';

describe('WeatherChart', () => {
  test('renders loading spinner when data is not available', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WeatherChart />
        </MemoryRouter>
      </Provider>
    );

    const loadingSpinner = screen.getByRole('progressbar');
    expect(loadingSpinner).toBeInTheDocument();
  });

  test('changes temperature unit on button click', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WeatherChart />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    const temperatureFahrenheitButton = screen.queryAllByText(/Fahrenheit/i);
    expect(temperatureFahrenheitButton).toHaveLength(3);

    // Simulate clicking the temperature unit button
    fireEvent.click(temperatureFahrenheitButton[0]);

    // Simulate clicking the button to change temperature unit
    // temperatureUnitButton.click();

    // Assert that the temperature unit has changed
    const temperatureUnitMenu = screen.getByRole('menu');
    expect(temperatureUnitMenu).toBeInTheDocument();

    // Choose the Fahrenheit option

    const temperatureCelsiusOption = screen.queryAllByText(/Celsius/i);
    expect(temperatureCelsiusOption).toHaveLength(1);

    fireEvent.click(temperatureCelsiusOption[0]);

    const temperatureCelsiusButton = screen.queryAllByText(/Celsius/i);
    expect(temperatureCelsiusButton).toHaveLength(4);
  });
});
