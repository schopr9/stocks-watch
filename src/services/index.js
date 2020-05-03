const API_ROOT = 'https://finnhub.io/api/v1/'

function callApi(endpoint, query) {
  const fullUrl =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint

  const url = new URL(fullUrl),
    params = {
      exchange: 'US',
      token: process.env.REACT_APP_FINNHUB_TOKEN,
      ...query,
    }
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  )

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      return data
    })
    .then(
      (response) => ({ response }),
      (error) => ({ error: error.message || 'Something bad happened' })
    )
}

// api services
export const fetchSymbolAutocomplete = (query) => callApi('stock/symbol', query)
