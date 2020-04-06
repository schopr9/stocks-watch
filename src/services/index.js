const API_ROOT = 'https://finnhub.io/api/v1/'

function callApi(endpoint, query) {
  const fullUrl =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint

  const url = new URL(fullUrl),
    params = {
      query,
      excahnge: 'US',
      token: process.env.REACT_APP_FINNHUB_TOKEN,
    }
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  )

  return fetch(url)
    .then((response) => response.json())
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      return json
    })
    .then(
      (response) => ({ response }),
      (error) => ({ error: error.message || 'Something bad happened' })
    )
}

// api services
export const fetchSymbolAutocomplete = (query) => callApi('symbol', query)
