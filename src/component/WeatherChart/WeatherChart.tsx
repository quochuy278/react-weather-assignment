/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState, useEffect, useRef } from 'react';

import {
  Box,
  CircularProgress,
  Button,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import { useFetchWeatherForcastHourlyQuery } from '../../store/service/service';
import moment from 'moment';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from './WeatherChart.module.css';
import { transformResponseKey } from '../../utils/transformResponseKeys';
import accessibility from 'highcharts/modules/accessibility';

accessibility(Highcharts);

const WeatherChart = (): JSX.Element => {
  const chartRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const [temperatureUnit, setTemperatureUnit] = useState<string>('fahrenheit');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const { data, isSuccess } = useFetchWeatherForcastHourlyQuery(
    `&hourly=temperature_2m&temperature_unit=${temperatureUnit}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (isSuccess && data) {
      setWeatherData(data);
    }
  }, [isSuccess, data]);

  if (!weatherData) {
    console.log('is this runnig ?');
    return (
      <Box className={styles.weather__container}>
        <CircularProgress />
      </Box>
    );
  }
  const handleOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleTemperatureUnit = (unit: string): void => {
    setTemperatureUnit(unit);
    setOpen(false);
  };

  const options = {
    accessibility: {
      enabled: true,
    },
    chart: {
      type: 'line',
      height: 600,
    },
    title: {
      text: 'Temperature Variation Over 7 Days',
    },
    xAxis: {
      type: 'day',
      categories: weatherData.hourly.time.map(function (time: string) {
        return moment(time).format('H:mm');
      }),
    },
    yAxis: {
      title: {
        text: `Temperature: ${transformResponseKey(temperatureUnit)}`,
      },
    },
    series: weatherData.temperature_2m.map(
      (temperatureData: string[], index: number) => ({
        name: moment(weatherData.time[index][0]).format('DD-MM'),
        data: [...temperatureData], // Create a new copy of the array
      })
    ),
  };
  return (
    <Box>
      <Box className={styles.btn_container}>
        <Button
          variant="text"
          endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDownIcon />}
          onClick={handleOpen}
        >
          {temperatureUnit}
        </Button>
        <Menu
          open={open}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          anchorEl={anchorEl}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleTemperatureUnit('celsius');
            }}
          >
            Celsius
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleTemperatureUnit('fahrenheit');
            }}
          >
            Fahrenheit
          </MenuItem>
        </Menu>
      </Box>
      {weatherData && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </Box>
  );
};

export default WeatherChart;
