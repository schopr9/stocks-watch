import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useReactPWAInstall } from 'react-pwa-install'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import ArrowDownward from '@material-ui/icons/ArrowDownward'

const useStyles = makeStyles({
  button: {
    color: 'white',
  },
})

const Install = () => {
  const classes = useStyles()
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall()
  const handleClick = () => {
    pwaInstall({
      title: 'Stocks Watch',
      features: (
        <ul>
          <li>Favorite your stocks</li>
          <li>create holdings such as TFSA or RRSP</li>
          <li>Recommended stocks through Machine learning</li>
          <li>Works offline</li>
        </ul>
      ),
      description: 'There are lot of feature that needs to be developed but when its done it can do the following. ',
    })
      .then(() =>
        alert('App installed successfully or instructions for install shown')
      )
      .catch(() => alert('User opted out from installing'))
  }

  if (!supported() || isInstalled()) {
    return null
  }

  return (
    <BottomNavigationAction
      label="Install"
      icon={<ArrowDownward />}
      className={classes.button}
      onClick={handleClick}
    />
  )
}

export default Install
