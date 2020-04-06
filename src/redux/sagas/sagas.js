/* eslint-disable no-constant-condition */
import { take, put, call, fork, all, select } from 'redux-saga/effects'
import { fetchSymbolAutocomplete } from '../../services'
import * as actions from '../actions'
// import {} from '../reducers/selectors'

// each entity defines 3 creators { request, success, failure }
const { stock } = actions

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
export const fetchAutoComplete = fetchEntity.bind(null, stock, fetchSymbolAutocomplete)

// load user unless it is cached
function* searchSymbol(query, requiredFields) {
  const stocks  = yield select()
  const result = yield call(fetchAutoComplete, query)
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

// trigger router navigation via history
function* watchNavigate() {
  while (true) {
    const { pathname } = yield take(actions.NAVIGATE)
  }
}

// Fetches data for a User : user data + starred repos
function* watchSearchSymbol() {
  while (true) {
    const { query, requiredFields = [] } = yield take(actions.LOAD_STOCK_SEARCH)

    yield fork(searchSymbol, query)
    //  yield fork(loadStarred, login)
  }
}

export default function* root() {
  yield all([fork(watchNavigate), fork(watchSearchSymbol)])
}
