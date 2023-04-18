import React from "react";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles()(() => {
  return {
    title: {
      flex: 1,
      color: "gold",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main : "#fff",
    },
    type : "dark",
  }
});

function Header() {

  const { classes } = useStyles();
  const navigate = useNavigate();

  const {currency, setcurrency} = CryptoState();

  console.log(currency);

  return (
    <ThemeProvider theme={darkTheme} >
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography 
              onClick={()=> navigate("/")} 
              className={classes.title} 
              variant="h6"
            >
              Coin Sense
            </Typography>

            <Select 
              variant="outlined" 
              labelId="demo-simple-select-label"
              id="demo-simple-select" 
              style={{width:100, height:40, marginLeft:15}}
              value={currency}
              onChange={(e) => setcurrency(e.target.value)} 
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
