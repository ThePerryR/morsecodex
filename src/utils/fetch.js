import 'isomorphic-fetch'

export default (url, method = 'get', body, params, _csrf) => {
  const request = {
    method,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
  if (method !== 'get') {
    request.body = JSON.stringify(Object.assign({}, body, {_csrf}))
  }
  const esc = encodeURIComponent
  let query
  if (params && typeof params === 'object') {
    query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&')
  } else if (params) {
    query = params
  }

  return fetch(query ? `${url}${query}` : url, request)
}

export function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  if (response.status === 401) {
    // Trigger a page reload so that the server redirects to login page
    window.location.reload()
  }
  throw response.json()
}

export function parseJSON (response) {
  return response.json()
}
