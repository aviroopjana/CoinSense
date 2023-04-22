import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CryptoState } from "../CryptoContext";
import axios from 'axios';
import { SingleCoin } from "../config/api";
import { makeStyles } from "tss-react/mui";
import CoinInfo from '../components/CoinInfo';
import { LinearProgress, Typography } from '@mui/material';
import DOMPurify from 'dompurify';
import { numberWithCommas } from "../components/CoinsTable";


const CoinPage = () => {

  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async()=> {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  },[]);

  const useStyle = makeStyles() (()=>{
    return{
      container: {
        display: "flex",
        "@media (max-width: 960px)": {
          flexDirection: "column",
          alignItems: "center",
        },
      },
      sidebar: {
        width: "30%",
        "@media (max-width: 960px)": {
          width: "100%",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid grey",
      },
      heading: {
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "sans-serif",
      },
      description: {
        width: "100%",
        fontFamily: "Montserrat",
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: "justify"
      },
      marketData: {
        alignSelf: "start",
        padding: 25,
        paddingTop: 10,
        width: "100%",
        "@media (min-width: 960px)": {
            flexDirection: "row",
            justifyContent: "space-around",
          },
          "@media (min-width: 600px) and (max-width: 959px)": {
              flexDirection: "column",
              alignItems: "center",
            },
          
          "@media (max-width: 599px)": {
              alignItems: "start",
            },  
          },
        }
      })

  const { classes } = useStyle();

  if(!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container} >
      <div className={classes.sidebar} >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />

        <Typography variant='h3' classsName={classes.heading} >
          {coin?.name}
        </Typography>

        <Typography variant="subtitle1" className={classes.description}>
          {DOMPurify.sanitize(coin?.description.en.split(". ")[0])}
        </Typography>

        <div className={classes.marketData} >
          <span style={{ display:"flex" }} >
            <Typography variant='h5' className={classes.heading} >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
              style={{
                fontFamily:"Montserrat"
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display:"flex" }} >
            <Typography variant='h5' className={classes.heading} >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
              style={{
                fontFamily:"Montserrat"
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span style={{ display:"flex" }} >
            <Typography variant='h5' className={classes.heading} >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
              style={{
                fontFamily:"Montserrat"
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>      

        </div>

      </div>
      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  )
};

export default CoinPage