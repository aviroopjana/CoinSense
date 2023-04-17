import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import './App.css';
import CoinPage from './pages/CoinPage';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles() (()=> {
  return{
    App: {
      backgroundColor: '#14161A',
      color: 'white',
      minHeight: '100vh'
    }
  }
});

function App() {  
  const { classes } = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
        <Route path='/' Component={HomePage} exact/>
        <Route path='/coins/:id' Component={CoinPage}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
