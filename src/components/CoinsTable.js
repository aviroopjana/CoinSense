import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { ThemeProvider } from '@emotion/react';
import { Container, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, createTheme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
    },
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",  
      },
      fontFamily: "Montserrat",
     },
     pagination: {
      '& .MuiPaginationItem-root': {
        color: 'gold',
        '&.Mui-selected': {
          fontWeight: 'bold',
          color: 'white',
          backgroundColor: 'rgba(255, 215, 0, 0.5)',
          '&:hover': {
            backgroundColor: 'rgba(255, 215, 0, 0.8)',
          },
        },
      },
    },
  };
})

const CoinsTable = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const { currency, symbol } = CryptoState();

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

  const handelSearch = ()=> {
    return coins.filter(
      (coin) => 
      coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    );
  };

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
          inputProps={{style: {color: "white"}}}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{backgroundColor:"gold"}} />
          ) : (
                  <Table aria-label= "simple table" >
                    <TableHead style={{backgroundColor: "#EEBC1D"}} >
                      <TableRow>
                        {["Coin", "Price", "24h Change", "Market Cap"].map((head)=> (
                          <TableCell
                            style={{
                              color: "black",
                              fontWeight: 700,
                              fontFamily: "Montserrat"  
                            }}
                            key={head}
                            align={head === "Coin" ? "" : "right"}
                          >
                            {head}
                          </TableCell>
                        ))}
                        
                      </TableRow>
                    </TableHead>

                    <TableBody>
                            {handelSearch()
                            .slice((page - 1)*10,(page - 1)* 10 + 10)
                            .map((row) => {
                              const profit =row.price_change_percentage_24h > 0;

                              return (
                                <TableRow
                                  onClick={() => navigate(`/coins/${row.id}`)}
                                  className={classes.row}
                                  key={row.name}
                                >
                                  <TableCell
                                    component="th"
                                    scope='column'
                                    style={{
                                      display: 'flex',
                                      // flexDirection: "column",
                                      gap: 15
                                    }}
                                  >
                                    <img
                                      src={row?.image}
                                      alt={row?.name}
                                      height="50"
                                      style={{
                                        marginBottom: 10
                                      }}
                                    />
                                    <div
                                      style={{
                                        display:"flex",
                                        flexDirection: "column"
                                      }}
                                    >
                                      <span
                                        style={{
                                          textTransform: "uppercase",
                                          fontSize: 20,
                                          color: "#fff"
                                        }}
                                      >
                                        {row.symbol}
                                      </span>
                                      <span
                                        style={{
                                          color: "darkgray"
                                        }}
                                      >
                                        {row.name}
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell align="right" style={{ color:"#fff" }}>
                                    {symbol}{" "}
                                    {numberWithCommas(row.current_price.toFixed(2))}
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    style={{
                                      color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {profit && "+"}
                                    {row.price_change_percentage_24h.toFixed(2)}%
                                  </TableCell>
                                  <TableCell align="right" style={{ color:"#fff" }} >
                                    {symbol}{" "}
                                    {numberWithCommas(
                                      row.market_cap.toString().slice(0, -6)
                                    )}
                                    M
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                    </TableBody>
                  </Table>
          )}
        </TableContainer>

        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          count={(handelSearch()?.length / 10).toFixed(0)}
          onChange={(_,value)=> {
            setPage(value);
            window.scroll(0,350);
          }}
        />

      </Container>
    </ThemeProvider>     
  );
}

export default CoinsTable
