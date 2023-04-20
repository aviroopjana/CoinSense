import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { ThemeProvider } from '@emotion/react';
import { Container, TextField, Typography, createTheme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(()=> {
  return{
    textField: {
      color: "white",
      "& .MuiSelect-icon": {
        color: "white",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "white",
        transition: "border-color 0.2s ease-in-out",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "white",
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "white",
      },
      "& .MuiInputLabel-root": {
        color: "white",
      },
    }
  }
})

const CoinsTable = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const { currency } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    
    setCoins(data);
    setLoading(false);
  };

  console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main : "#fff",
      },
      type : "dark",
    }
  });

  const { classes } = useStyles();

  return (
    <ThemeProvider theme={darkTheme} >
      <Container style={{ textAlign: "center" }} >
        <Typography
          variant='h4'
          style={{ margin: 18, fontFamily: "Monserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          className={classes.textField}
          variant='outlined'
          label="Search for a Crypto Currency..."
          style={{
            marginBottom: 20,
            width: "100%",
          }}
          onChange={(e)=> setSearch(e.target.value)}
        />
      </Container>
    </ThemeProvider>     
  );
}

export default CoinsTable
