import React, { Fragment, useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Tabs,
  Tab,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
  },
  logo: {
    height: '8em',
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px',
  },
}));

export const Header = props => {
  const [value, setvalue] = useState(0);

  const classes = useStyles();

  const handleChange = (event, value) => {
    setvalue(value);
  };

  useEffect(() => {
    if (window.location.pathname === '/' && value !== 0) {
      setvalue(0);
    } else if (window.location.pathname === '/services' && value !== 1) {
      setvalue(1);
    } else if (window.location.pathname === '/revolution' && value !== 2) {
      setvalue(2);
    } else if (window.location.pathname === '/about' && value !== 3) {
      setvalue(3);
    } else if (window.location.pathname === '/contact' && value !== 4) {
      setvalue(4);
    } else if (window.location.pathname === '/estimate' && value !== 5) {
      setvalue(5);
    }
  }, [value]);

  return (
    <Fragment>
      <ElevationScroll>
        <AppBar position='fixed' color='primary'>
          <Toolbar disableGutters>
            <Button
              component={Link}
              to='/'
              disableRipple
              className={classes.logoContainer}
              onClick={() => setvalue(0)}
            >
              <img alt='company logo' src={logo} className={classes.logo} />
            </Button>

            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabContainer}
              indicatorColor='primary'
            >
              <Tab
                className={classes.tab}
                component={Link}
                to='/'
                label='Home'
              />
              <Tab
                className={classes.tab}
                component={Link}
                to='/services'
                label='Services'
              />
              <Tab
                className={classes.tab}
                component={Link}
                to='/revolution'
                label='The Revolutions'
              />
              <Tab
                className={classes.tab}
                component={Link}
                to='/about'
                label='About Us'
              />
              <Tab
                className={classes.tab}
                component={Link}
                to='/contact'
                label='Contact Us'
              />
            </Tabs>
            <Button
              variant='contained'
              color='secondary'
              component={Link}
              to='/estimate'
              className={classes.button}
            >
              Free Estimate
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </Fragment>
  );
};
