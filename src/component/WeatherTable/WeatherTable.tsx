/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from 'react';

import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { useFetchWeatherForcastQuery } from '../../store/service/service';
import { getWeekDays } from '../../utils/getWeekdays';
import { transformResponseKey } from '../../utils/transformResponseKeys';
import styles from './WeatherTable.module.css';

const WEATHER_FIELDS: string[] = [
  'temperature_2m_max',
  'temperature_2m_min	',
  'apparent_temperature_max',
  'apparent_temperature_min',
  'precipitation_sum',
  'rain_sum',
  'precipitation_hours',
  'weathercode',
  'windspeed_10m_max',
  'windgusts_10m_max',
];

const TIMEZONE = 'Europe/Helsinki';

const WeatherTable = (): JSX.Element => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const { data, isSuccess } = useFetchWeatherForcastQuery(
    `&daily=${WEATHER_FIELDS.join(',')}&timezone=${TIMEZONE}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  useEffect(() => {
    if (isSuccess) {
      setWeatherData(data);
    }
  }, [isSuccess, data]);

  if (!weatherData) {
    return (
      <Box className={styles.weather__container}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Parameter/Days</TableCell>
            {getWeekDays().map((day: string, index: number) => {
              return (
                <TableCell key={index} align="right">
                  {day}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {Object.entries(data.daily).map(([key, values]) => {
            if (key === 'time') return null; // Skip 'time' key
            const transformKey = transformResponseKey(key);
            return (
              <TableRow key={key} sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                  {transformKey}
                </TableCell>
                {values.map((value: string | number, index: number) => (
                  <TableCell key={index} align="right">
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WeatherTable;
