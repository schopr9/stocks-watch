import React, { useState, useEffect } from 'react'
import { useReactPWAInstall } from 'react-pwa-install'
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

function App({ history }) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall()

  const handleClick = () => {
    pwaInstall({
      title: 'Install Web App',
      features: (
        <ul>
          <li>Cool feature 1</li>
          <li>Cool feature 2</li>
          <li>Even cooler feature</li>
          <li>Works offline</li>
        </ul>
      ),
      description: 'This is a very good app that does a lot of useful stuff. ',
    })
      .then(() =>
        alert('App installed successfully or instructions for install shown')
      )
      .catch(() => alert('User opted out from installing'))
  }

  return (
    <div className="App">
      <header>
        <h1>Stocks Watch</h1>
        <SearchSymbol history={history} />
      </header>
      {value === 0 && <div>coming soon</div>}
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
        {supported() && !isInstalled() && (
          <BottomNavigationAction
            label="Install"
            icon={<ArrowDownward />}
            className={classes.button}
            onClick={handleClick}
          />
        )}
      </BottomNavigation>
    </div>
  )
}

export default App
