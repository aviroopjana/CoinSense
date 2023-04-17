import React from 'react';
import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import makeStyles from 'tss-react';

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography className={classes.title}>
            CoinSense
          </Typography>

          <Select>
            <MenuItem value ='USD'>USD</MenuItem>
            <MenuItem value ='INR' >INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header;