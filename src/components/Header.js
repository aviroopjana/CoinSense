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
      fontWeight: "bolder",
      cursor: "pointer",
    },
    AppBar: {
      backgroundColor: "#212121",
    },
    select: {
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
      <AppBar position="static" className={classes.AppBar} >
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
              className={classes.select}
              value={currency}
              onChange={(e) => setcurrency(e.target.value)}
            >
              <MenuItem value="USD" >USD</MenuItem>
              <MenuItem value="INR" >INR</MenuItem>
            </Select>

          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
