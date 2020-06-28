/* eslint-disable no-constant-condition */
import { take, put, call, fork, all, select, delay } from 'redux-saga/effects'
import { fetchSymbolAutocomplete, symbolDetail } from '../../services'
import * as actions from '../actions'
import { getAllStocks } from '../reducers/selectors'

// each entity defines 3 creators { request, success, failure }
const { symbols } = actions

/***************************** Subroutines ************************************/

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass id to apiFn
function* fetchEntity(entity, apiFn, id, url) {
  // yield put(entity.request(id))
  const { response, error } = yield call(apiFn, id)
  if (response) yield put(entity.success(id, response))
  else yield put(entity.failure(id, error))
}

export const fetchAutoComplete = fetchEntity.bind(
  null,
  symbols(),
  fetchSymbolAutocomplete
)

function* searchSymbol(query, requiredFields) {
  const stocks = yield select(getAllStocks)
  if (!!stocks && stocks.length === 0) {
    yield call(fetchAutoComplete, query)
  }
}

export const fetchSymbolDetail = fetchEntity.bind(
  null,
  symbols(actions.GET_SYMBOl_DETAIL),
  symbolDetail
)

function* getSymbol(query) {
  let num = 0
  while (num < 15) {
    delay(1000)
    num++
    yield call(fetchSymbolDetail, query)    
  }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

// Fetches data for a User : user data + starred repos
function* watchSearchSymbol() {
  while (true) {
    const { query } = yield take(actions.LOAD_SYMBOLS_SEARCH)
    yield fork(searchSymbol, query)
  }
}

function* watchGetSymbol() {
  while (true) {
    const { query } = yield take(actions.GET_SYMBOl_DETAIL.REQUEST)
    yield fork(getSymbol, query)
  }
}

export default function* root() {
  yield all([fork(watchSearchSymbol), fork(watchGetSymbol)])
}
