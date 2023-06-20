import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

import styles from './Weather.module.css';

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];
const Weather = () => {
  const { data } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 7,
  });
  return (
    <Box className={styles.weather__container}>
        <Typography className={styles.weather__title}>Daily Temperature in 7 days</Typography>
      <div style={{ height: '60%', width: '80%' }}>
        <DataGrid {...data} />
      </div>
    </Box>
  );
};

export default Weather;
