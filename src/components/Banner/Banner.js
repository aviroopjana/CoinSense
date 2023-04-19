import { Container, Typography } from '@mui/material'
import { makeStyles } from "tss-react/mui";
import React from 'react'
import bannerImage from './banner.jpg'

const useStyles = makeStyles() (()=> {
    return{
        banner: {
            backgroundImage: `url(${bannerImage})`,
          },
        bannerContent: {
            height: 400,
            display: "flex",
            flexDirection: "coloum",
            paddingTop: 25,
            justifyContent: "space-around",
        },
        tagline: {
          display: "flex",
          height: "40%",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center"
        }, 
    };  
});

const Banner = () => {
    const { classes } = useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
          <div className={classes.tagline}>
            <Typography
              variant='h2'
              style={{
                fontWeight: "bold",
                marginBottom: 15,
                fontFamily: "Monserrat",
              }}
            >
              Coin Sense
            </Typography>
            <Typography
              variant='subtitle2'
              style={{
                color: "darkgrey",
                textTransform: "capitalize",
                fontfamily: "Montserrat",
              }}
            >
            It's high time to keep track of all your favourite Crypto Currencies
            </Typography>
          </div>
        </Container>
    </div>
  )
}

export default Banner