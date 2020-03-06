import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import "./App.css";
import { promptUser, deferredInstallPrompt } from "./install";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#0e0e0e",
    position: "fixed",
    zIndex: 2,
    left: 0,
    bottom: 0,
    width: "100%",
    color: "white"
  },
  button: {
    color: "white"
  }
});

function App() {
  const [data, setData] = useState({});
  const userAgent = navigator.userAgent;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
        {/android/i.test(userAgent) && deferredInstallPrompt && (
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
        )}
      </header>
      <div className="stock">
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
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label="Recents"
          icon={<RestoreIcon />}
          className={classes.button}
        />
        <BottomNavigationAction
          label="Favorites"
          icon={<FavoriteIcon />}
          className={classes.button}
        />
        <BottomNavigationAction
          label="Nearby"
          icon={<LocationOnIcon className={classes.button} />}
        />
      </BottomNavigation>
    </div>
  );
}

export default App;
