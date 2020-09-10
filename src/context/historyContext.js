import React, { createContext } from 'react'
import PropTypes from 'prop-types'

export const HistoryContext = createContext({})

export const HistoryProvider = ({ history, children }) => {
  const navigateTo = (path, params = {}) => history.push(path, params)

  const historyContext = {
    navigateTo,
    history,
  }

  return (
    <HistoryContext.Provider value={historyContext}>
      {children}
    </HistoryContext.Provider>
  )
}

HistoryProvider.propTypes = {
  history: PropTypes.object,
  children: PropTypes.any,
}
