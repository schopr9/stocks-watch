import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { combineReducers } from 'redux'

// Updates an entity cache in response to any action with response.entities.
function searchSymbol(state = { symbols: [] }, action) {
  const { type, response } = action

  if (type === ActionTypes.SYMBOLS.SUCCESS) {
    return merge({}, state, { symbols: response })
  }

  return state
}

function saveSymbolDetail(state = { symbols: {} }, action) {
  const { type, response, query } = action

  if (
    type === ActionTypes.GET_SYMBOl_DETAIL.SUCCESS ||
    type === ActionTypes.GET_BASIC_DETAIL.SUCCESS
  ) {
    return merge({}, state, {
      symbols: {
        ...state.symbols,
        [query.symbol]: { ...state.symbols[query.symbol], ...response },
      },
    })
  }
  return state
}

function addToFavorite(state = { favorite: [] }, action) {
  const { type, symbol } = action

  const newFavorite = state.favorite.some((o) => o === symbol)
    ? state.favorite.filter((o) => o !== symbol)
    : [...state.favorite, symbol]

  if (type === ActionTypes.ADD_TO_FAVORITE && symbol) {
    return merge({}, { favorite: newFavorite })
  }

  return state
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

function router(state = { pathname: '/' }, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_ROUTER_STATE:
      return action.state
    default:
      return state
  }
}

const rootReducer = combineReducers({
  searchSymbol,
  saveSymbolDetail,
  errorMessage,
  addToFavorite,
  router,
})

export default rootReducer
