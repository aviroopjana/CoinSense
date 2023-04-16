import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import './App.css';
import CoinPage from './pages/CoinPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Route path='/' Component={HomePage} exact/>
        <Route path='coins/:id' Component={CoinPage}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
