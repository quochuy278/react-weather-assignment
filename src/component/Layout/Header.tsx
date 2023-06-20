import { AppBar, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import styles from './Header.module.css'

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar>
          Weather app
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
