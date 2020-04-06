import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { combineReducers } from 'redux'

// Updates an entity cache in response to any action with response.entities.
function searchSymbol(state = { stocks: [] }, action) {
  const { type, response } = action
  console.log(action)

  if (type === ActionTypes.STOCK_SUCCESS) {
    return merge({}, state, { stocks: response })
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
  errorMessage,
  router,
})

export default rootReducer
