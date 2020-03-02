import React, { useState, useEffect } from "react";
import "./App.css";
import { promptUser } from "./install";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          "https://finnhub.io/api/v1/quote?symbol=IVV&token=bpbgne7rh5r9k08n8teg"
        ).then(response => response.json());
        setData(result);
      } catch (e) {
        setData({
          c: 301.25,
          o: 312.25,
          h: 289.36,
          l: 125.23
        });
      }
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <header>
        <h1>Stocks Watch</h1>
        <button
          style={{
            color: "white",
            padding: "10px",
            backgroundColor: "brown",
            marginLeft: "30px"
          }}
          onClick={promptUser}
        >
          Install
        </button>
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
