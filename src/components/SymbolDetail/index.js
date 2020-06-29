import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import FlipNumbers from 'react-flip-numbers'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import { getSymbolDetail } from '../../redux/actions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  muiAppBar: {
    backgroundColor: 'black',
    alignItems: 'flex-start',
    minHeight: 100,
  },
  favorite: {
    position: 'fixed',
    left: '80%',
  },
  div: {
    display: 'flex',
    marginLeft: '10%',
    color: 'red',
  },
  dollar: {
    fontSize: 'x-large',
  },
  description: {
    color: 'white',
    marginLeft: '10%',
    marginBottom: 12,
    display: 'flex',
  },
}))

function SymbolDetail({ getSymbolDetail, symbols, symbolDescriptions = [] }) {
  const classes = useStyles()
  let { symbol } = useParams()

  useEffect(() => {
    const loadData = () => {
      getSymbolDetail(symbol)
    }
    loadData()
  }, [symbol])
  const currentPrice =
    !!symbols && symbols[symbol] && symbols[symbol].c.toString()
  const previousClosePrice = !!symbols && symbols[symbol] && symbols[symbol].pc
  const stockDescription = symbolDescriptions.filter(
    (data) => data.symbol === symbol
  ) || [{ description: '' }]

  return (
    <div className="App">
      <AppBar position="static" className={classes.muiAppBar}>
        <Toolbar variant="dense">
          <Link to="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="arrow-back"
            >
              <ArrowBack />
            </IconButton>
          </Link>
          <Typography variant="h6" color="inherit">
            {symbol}
          </Typography>
          <IconButton
            className={classes.favorite}
            color="inherit"
            aria-label="arrow-back"
          >
            <FavoriteBorder />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.description}>
        {stockDescription[0] && stockDescription[0].description}
      </div>
      <div className={classes.div}>
        <div className={classes.dollar}>$</div>
        <FlipNumbers
          height={32}
          width={22}
          color={currentPrice > previousClosePrice ? 'green' : 'red'}
          play
          numberStyle
          numbers={currentPrice || '00.00'}
        />
      </div>
    </div>
  )
}

SymbolDetail.propTypes = {
  getSymbolDetail: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    symbols: state.saveSymbolDetail && state.saveSymbolDetail.symbols,
    symbolDescriptions: state.searchSymbol && state.searchSymbol.symbols,
  }
}

export default connect(mapStateToProps, {
  getSymbolDetail,
})(SymbolDetail)
