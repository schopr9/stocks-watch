import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/Home'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import './App.css'
import { promptUser, deferredInstallPrompt } from './install'
import SearchSymbol from './components/SearchSymbol'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#0e0e0e',
    position: 'fixed',
    zIndex: 2,
    left: 0,
    bottom: 0,
    width: '100%',
    color: 'white',
  },
  button: {
    color: 'white',
  },
})

function App() {
  const [data, setData] = useState({})
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const totalGainOrLoss = 59 * data.c - (50 * 315 + 9 * 301)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          'https://finnhub.io/api/v1/quote?symbol=IVV&token=bpbgne7rh5r9k08n8teg'
        ).then((response) => response.json())
        setData(result)
      } catch (e) {
        setData({
          c: 301.25,
          o: 312.25,
          h: 289.36,
          l: 125.23,
        })
      }
    }
    fetchData()
  }, [])
  return (
    <div className="App">
      <header>
        <h1>Stocks Watch</h1>
        <SearchSymbol />
      </header>
      {value === 0 && (
        <div className="stock">
          Stock name IVV
          <br></br>
          Current Price {data.c}
          <br></br>
          Opening Price {data.o}
          <br></br>
          Day highest {data.h}
          <br></br>
          Day lowest {data.l}
        </div>
      )}
      {value === 1 && (
        <div className="stock">
          Stock name IVV
          <br></br>
          Total Invested = {50 * 315 + 9 * 301}
          <br></br>
          Total {totalGainOrLoss > 0 ? 'gain' : 'loss'} ={' '}
          {totalGainOrLoss.toFixed(2)}
          <br></br>
        </div>
      )}
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          className={classes.button}
        />
        <BottomNavigationAction
          label="Holdings"
          icon={<FavoriteIcon />}
          className={classes.button}
        />
        {deferredInstallPrompt && (
          <BottomNavigationAction
            label="Install"
            icon={<ArrowDownward />}
            className={classes.button}
            onClick={promptUser}
          />
        )}
      </BottomNavigation>
    </div>
  )
}

export default App
