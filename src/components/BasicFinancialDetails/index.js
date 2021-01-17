import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { startCase, pick } from 'lodash'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: 'small',
  },
  multiline: {
    color: '#b1aaaa',
    display: 'flex',
    height: 28,
    justifyContent: 'space-between',
    fontSize: 'small',
    margin: 8,
  },
  divider: {
    background: '#2b2a2a',
    marginLeft: 8,
    marginRight: 8,
  },
}))

export default function InsetDividers({ basicFinancials }) {
  const classes = useStyles()

  if (!basicFinancials) {
    return null
  }

  return Object.keys(basicFinancials).map(function (key) {
    if (
      key.includes('52') ||
      key.includes('dividend') ||
      key.includes('beta')
    ) {
      return (
        <div>
          <div className={classes.multiline}>
            <p>{startCase(key)}</p>
            <div>
              <p>{basicFinancials[key]}</p>
            </div>
          </div>
          <Divider variant="light" component="li" className={classes.divider} />
        </div>
      )
    } else {
      return null
    }
  })
}
