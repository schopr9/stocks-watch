/* eslint-disable no-constant-condition */
import { take, put, call, fork, all, select } from 'redux-saga/effects'
import { fetchSymbolAutocomplete } from '../../services'
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
  yield put(entity.request(id))
  const { response, error } = yield call(apiFn, url || id)
  if (response) yield put(entity.success(id, response))
  else yield put(entity.failure(id, error))
}

// yeah! we can also bind Generators
export const fetchAutoComplete = fetchEntity.bind(
  null,
  symbols,
  fetchSymbolAutocomplete
)

// load user unless it is cached
function* searchSymbol(query, requiredFields) {
  const stocks = yield select(getAllStocks)
  if (!stocks) {
    yield call(fetchAutoComplete, query)
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

export default function* root() {
  yield all([fork(watchSearchSymbol)])
}
