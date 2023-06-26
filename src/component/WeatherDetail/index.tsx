import {
  Card,
  Box,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material';

import React, { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from './index.module.css';
import { useFetchWeatherForcastQuery } from '../../store/service/service';
import {
  getValueAtIndex,
  getWeatherDescription,
  splitString,
} from '../../utils';
import moment from 'moment';

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

const WeatherDetail = (): JSX.Element => {
  const param = useParams();
  console.log(param);
  const paramValue = param.slug as string;
  const index = paramValue?.charAt(paramValue.length - 1);
  console.log(index);
  const [weatherData, setWeatherData] = useState<any>(null);
  const { data, isSuccess } = useFetchWeatherForcastQuery(
    `&daily=${WEATHER_FIELDS.join(',')}&timezone=${TIMEZONE}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  useEffect(() => {
    if (isSuccess) {
      setWeatherData({
        weatherData: getValueAtIndex(data.daily, parseInt(index)),
        unit: { ...data.daily_units },
      });
    }
  }, [isSuccess, data]);
  console.log(weatherData);

  if (!weatherData) {
    return (
      <Box className={styles.card_container}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box className={styles.card_container}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card className={styles.weather_card}>
            <CardHeader
              title={splitString(paramValue)[0]}
              sx={{ textAlign: 'center' }}
            />
            <CardContent>
              <Box className={styles.temperature}>
                <Typography variant="body1">Temperature: </Typography>
                <Typography variant="body1">
                  Min: {weatherData?.weatherData.temperature_2m_min}{' '}
                  {weatherData?.unit.temperature_2m_min}
                </Typography>
                <Typography variant="body1">
                  Min: {weatherData?.weatherData.temperature_2m_max}{' '}
                  {weatherData?.unit.temperature_2m_min}
                </Typography>
              </Box>

              <Box className={styles.temperature}>
                <Typography variant="body1">Precipitation Sum: </Typography>
                <Typography variant="body1">
                  {weatherData?.weatherData.precipitation_sum}{' '}
                  {weatherData?.unit.precipitation_sum}
                </Typography>
              </Box>

              <Box className={styles.temperature}>
                <Typography variant="body1">Rain Sum: </Typography>
                <Typography variant="body1">
                  {weatherData?.weatherData.rain_sum}{' '}
                  {weatherData?.unit.rain_sum}
                </Typography>
              </Box>
              <Box className={styles.temperature}>
                <Typography variant="body1">Date: </Typography>
                <Typography variant="body1">
                  {moment(weatherData?.time).format('DD.MM.YYYY')}
                </Typography>
              </Box>

              <Box className={styles.temperature}>
                <Typography variant="body1">Weather: </Typography>
                <Typography variant="body1">
                  {getWeatherDescription(weatherData?.weatherData.weathercode)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WeatherDetail;
