import { Box, Typography } from '@mui/material';
import styles from './index.module.css';

const Error = (): JSX.Element => {
  return (
    <Box className={styles.error_container}>
      <Typography>Something wrong happend</Typography>
    </Box>
  );
};

export default Error;
