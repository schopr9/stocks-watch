const API_ROOT = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/github.com/'

function callApi(endpoint, query) {
  const fullUrl =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint

  const url = new URL(fullUrl),
    params = { query, lang: 'en', location: 'US' }
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  )

  return fetch(url, {
    headers: {
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_YAHOO_FINANCE_KEY,
    },
  })
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
export const fetchSymbolAutocomplete = (query) =>
  callApi(`market/auto-complete`, query)
