import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'

import routes from './routes'
import AppStore from './stores/AppStore'

const store = new AppStore(JSON.parse(document.getElementById('is').innerHTML.replace(/&quot;/g, '"')))

const mountNode = document.getElementById('app')

const renderApp = () => (
  <Router
    history={browserHistory}
    routes={routes(store.currentUser)}
    createElement={(Component, props) => (
      <Component store={store} {...props} />
    )}
  />
)
ReactDOM.render(renderApp(), mountNode)
