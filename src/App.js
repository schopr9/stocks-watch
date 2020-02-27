import React, { useState, useEffect }  from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://finnhub.io/api/v1/quote?symbol=IVV&token=bpbgne7rh5r9k08n8teg').then(response => response.json())
      setData(result);
    }
    fetchData();
  }, {})
  return (
    <div className="App">
      <header>
        <h1>Stocks Watch</h1>
      </header>
      Stock name IVV
      <br></br>
      Current Price {data.c}
      <br></br>
      opening Price {data.o}
      <br></br>
      day heighest {data.h}
      <br></br>
      day lowest {data.l}
    </div>
  );
}

export default App;
