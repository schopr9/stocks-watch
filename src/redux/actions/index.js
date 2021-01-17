const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

export const SYMBOLS = createRequestTypes('SYMBOLS')

export const UPDATE_ROUTER_STATE = 'UPDATE_ROUTER_STATE'
export const NAVIGATE = 'NAVIGATE'
export const LOAD_SYMBOLS_SEARCH = 'LOAD_SYMBOLS_SEARCH'
export const GET_SYMBOl_DETAIL = createRequestTypes('GET_SYMBOl_DETAIL')
export const GET_BASIC_DETAIL = createRequestTypes('GET_BASIC_DETAIL')
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'
export const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE'

function action(type, payload = {}) {
  return { type, ...payload }
}

export const symbols = (entity = SYMBOLS) => ({
  request: (query) => action(entity[REQUEST], { query }),
  success: (query, response) => action(entity[SUCCESS], { query, response }),
  failure: (query, error) => action(entity[FAILURE], { query, error }),
})

export const updateRouterState = (state) =>
  action(UPDATE_ROUTER_STATE, { state })
export const navigate = (pathname) => action(NAVIGATE, { pathname })
export const loadSearch = (query, requiredFields = []) =>
  action(LOAD_SYMBOLS_SEARCH, { query, requiredFields })
export const resetErrorMessage = () => action(RESET_ERROR_MESSAGE)
export const getSymbolDetail = (query, requiredFields = []) =>
  action(GET_SYMBOl_DETAIL.REQUEST, {
    query: { symbol: query },
    requiredFields,
  })
export const addToFavorite = (symbol) =>
  action(ADD_TO_FAVORITE, {
    symbol,
  })
