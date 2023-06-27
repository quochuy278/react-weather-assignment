/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React, { useEffect, useState } from 'react';
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
import { getWeekDays, transformResponseKey } from '../../utils';
import styles from './index.module.css';
import { useNavigate } from 'react-router';
import DynamicRenderer from '../DynamicRender';

const WEATHER_FIELDS: string[] = [
  'temperature_2m_max',
  'temperature_2m_min	',
  'apparent_temperature_max',
  'apparent_temperature_min',
  'precipitation_sum',
  'rain_sum',
  'weathercode',
];

const TIMEZONE = 'Europe/Helsinki';

const WeatherTable = (): JSX.Element => {
  const navigate = useNavigate();
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

  const handleClick = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    index: number
  ): void => {
    // Handle the click event and access the TableColumn information
    navigate(`/weather/${event.currentTarget.innerText}-${index}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Parameter/Days</TableCell>
            <DynamicRenderer
              render={getWeekDays().map((day: string, index: number) => {
                return (
                  <TableCell
                    className={styles.day}
                    key={index}
                    align="right"
                    onClick={(event) => {
                      handleClick(event, index);
                    }}
                  >
                    {day}
                  </TableCell>
                );
              })}
            />
          </TableRow>
        </TableHead>

        <TableBody>
          <DynamicRenderer
            render={Object.entries(data.daily).map(([key, values]) => {
              if (key === 'time') return null; // Skip 'time' key
              const transformKey = transformResponseKey(key);
              return (
                <TableRow key={key} sx={{ '& > *': { borderBottom: 'unset' } }}>
                  <TableCell component="th" scope="row">
                    {transformKey}
                  </TableCell>
                  {values.map((value: string | number, index: number) => (
                    <TableCell key={index} align="center">
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WeatherTable;
