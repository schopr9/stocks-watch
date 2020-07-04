import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import ReactPWAInstallProvider from 'react-pwa-install'
import HomeIcon from '@material-ui/icons/Home'
import FavoriteIcon from '@material-ui/icons/Favorite'
import './App.css'
// import { promptUser, deferredInstallPrompt } from './install'
import SearchSymbol from './components/SearchSymbol'
import Install from './components/Install'
import Favorites from './components/Favorites'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#0e0e0e',
    position: 'fixed',
    zIndex: 2,
    left: 0,
    bottom: 0,
    width: '100%',
    color: 'white',
    padding: 10,
    height: 60,
  },
  button: {
    color: 'white',
  },
})

function App({ history }) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  return (
    <div className="App">
      <header>
        <h1>Stocks Watch</h1>
        <SearchSymbol history={history} />
      </header>
      {value === 0 && <Favorites />}
      {value === 1 && <div className="stock">Coming Soon</div>}
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
        <ReactPWAInstallProvider enableLogging>
          <Install />
        </ReactPWAInstallProvider>
      </BottomNavigation>
    </div>
  )
}

export default App
