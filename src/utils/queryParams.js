export default function getParameterByName (name, url) {
  if (!url) {
    url = window.location.href
  }
  name = name.replace(/[[\]]/g, '\\$&')
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export function removeURLParameter (parameter, url) {
  if (!url) {
    url = window.location.href
  }
  const urlparts = url.split('?')
  if (urlparts.length < 2) {
    return url
  }
  const prefix = `${encodeURIComponent(parameter)}=`
  const pars = urlparts[1].split(/[&;]/g)

  for (let i = pars.length; i-- > 0;) {
    if (pars[i].lastIndexOf(prefix, 0) !== -1) {
      pars.splice(i, 1)
    }
  }

  url = `${urlparts[0]}${(pars.length > 0 ? `?${pars.join('&')}` : '')}`
  return url
}

export function updateQueryStringParameter (uri, key, value) {
  const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i')
  const separator = uri.indexOf('?') !== -1 ? '&' : '?'
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + '=' + value + '$2')
  } else {
    return uri + separator + key + '=' + value
  }
}
