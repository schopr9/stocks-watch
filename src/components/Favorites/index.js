import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import FlipNumbers from 'react-flip-numbers'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { startCase } from 'lodash'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      height: theme.spacing(8),
      background: '#0e0e0e',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      padding: 6,
    },
  },
}))

const FavoriteCard = ({ favSymbol, stockDescription, symbolDetail }) => {
  const classes = useStyles()
  const pertcentageValue =
    symbolDetail &&
    (((symbolDetail.c - symbolDetail.pc) / symbolDetail.pc) * 100).toFixed(1)

  return (
    <div className={classes.root}>
      <Paper elevation={3} color="black">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', padding: '3%' }}>{favSymbol}</div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 12,
              margitLeft: 7,
            }}
          >
            {startCase(stockDescription)}
          </div>
        </div>
        {symbolDetail && (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div
              style={{
                backgroundColor: pertcentageValue > 0 ? 'green' : 'red',
                marginTop: 20,
                marginBottom: 20,
                marginRight: 8,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                padding: 12,
              }}
            >
              {pertcentageValue.concat('%')}
            </div>
            <FlipNumbers
              height={18}
              width={13}
              play
              numberStyle
              numbers={
                (symbolDetail.pc && symbolDetail.c.toString()) || '00.00'
              }
            />
          </div>
        )}
      </Paper>
    </div>
  )
}

function Favorites({ favorites, symbolDescriptions, symbolDetails }) {
  return (
    <Fragment>
      {favorites.map((favSymbol) => {
        const stockDescription = symbolDescriptions.filter(
          (data) => data.symbol === favSymbol
        ) || [{ description: '' }]
        return (
          <FavoriteCard
            key={favSymbol}
            favSymbol={favSymbol}
            stockDescription={
              stockDescription[0] && stockDescription[0].description
            }
            symbolDetail={symbolDetails[favSymbol]}
          />
        )
      })}
    </Fragment>
  )
}

Favorites.propTypes = {
  getFavorites: PropTypes.func,
  addToFavorite: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    symbolDetails: state.saveSymbolDetail && state.saveSymbolDetail.symbols,
    symbolDescriptions: state.searchSymbol && state.searchSymbol.symbols,
    favorites: state.addToFavorite && state.addToFavorite.favorite,
  }
}

export default connect(mapStateToProps, null)(Favorites)
