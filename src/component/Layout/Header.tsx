import {
  AppBar,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';

import styles from './Header.module.css';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  {
    id: 0,
    primaryText: 'Weather',
    path: '/',
    selectedIndex: 0,
  },
  {
    id: 1,
    primaryText: 'Weather chart',
    path: '/',
    selectedIndex: 1,
  },
  {
    id: 2,
    primaryText: 'Weather table',
    path: '/table',
    selectedIndex: 2,
  },
];

type Anchor = 'top' | 'left' | 'bottom' | 'right';
const Header = (): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [state, setState] = useState({
    left: false,
  });
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ): void => {
    setSelectedIndex(index);
  };
  const list = (anchor: Anchor): JSX.Element => (
    <Box
      className={styles.drawer}
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem
          key={`Weather App`}
          className={styles.drawer__title__container}
        >
          <Typography className={styles.drawer__title}>Weather App</Typography>
        </ListItem>
        {navItems.map((item) => {
          return (
            <ListItem key={item.primaryText} disablePadding>
              <Link
                to={item.path}
                key={item.primaryText}
                className={styles.nav__link__item}
                replace
              >
                <ListItemButton
                  onClick={(event) => {
                    handleListItemClick(event, item.selectedIndex);
                  }}
                  selected={selectedIndex === item.selectedIndex}
                  className={
                    selectedIndex === item.selectedIndex
                      ? `${styles.active}`
                      : ''
                  }
                >
                  <ListItemText
                    primary={item.primaryText}
                    className={styles.list__item__text}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Fragment key={'left'}>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ padding: 0 }}
              onClick={toggleDrawer('left', true)}
            >
              <MenuIcon sx={{ color: '#000000' }} />
            </IconButton>
            <SwipeableDrawer
              anchor={'left'}
              open={state.left}
              onClose={toggleDrawer('left', false)}
              onOpen={toggleDrawer('left', true)}
            >
              {list('left')}
            </SwipeableDrawer>
          </Fragment>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
