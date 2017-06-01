import React from 'react'
import crypto from 'crypto'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import styleSheet from 'styled-components/lib/models/StyleSheet'

import Html from '../components/pages/Html'
import getRoutes from '../routes'
import AppStore from '../stores/AppStore'
import * as requests from '../components/pages/requests'

/*
 * serveApp
 * This middleware/route acts as a catch all for GET request
 * It renders and serves our isomorphic application
 */
export default function (req, res, next) {
  const routes = getRoutes(req.user)
  const location = req.url
  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    }

    if (error || !renderProps) {
      return next(error)
    }

    let hmac
    if (req.user && req.user._id) {
      hmac = crypto.createHmac('sha256', 'R3D1J_FMJw8tKm0pdpRPVAAj0HR23PUBSdIrsV6f')
      hmac.update(req.user._id.toString())
    }

    const fetchData = () => new Promise((resolve, reject) => {
      const {params, location, components} = renderProps
      let request = null
      components.forEach((component) => {
        if (component.request) {
          request = requests[component.request]({req, res, params, location})
          request.then(resolve).catch(reject)
        }
      })
      if (!request) {
        resolve({})
      }
    })

    const render = ({blueprint = {}, data = {}}) => {
      data.csrf = req.csrfToken()
      if (req.user) {
        data.currentUserId = req.user._id
        data.users = [...(data.users || []), req.user]
        data.user_hash = hmac.digest('hex')
      }
      const store = new AppStore(data, {[req.originalUrl]: blueprint})

      const content = renderToString(
        <RouterContext
          {...renderProps}
          createElement={(Component, props) => (
            <Component
              {...props}
              store={store}
            />
          )}
        />
      )

      const styles = styleSheet.rules().map(rule => rule.cssText).join('\n')
      const state = JSON.stringify(store.asJSON)
      const assets = global.webpackIsomorphicTools.assets()
      const markup = <Html {...{styles, assets, state, content}} />
      const doctype = '<!doctype html>\n'
      const html = renderToStaticMarkup(markup).replace(/&quot;/g, '"').replace(/&#x27;/g, '\'')
      res.send(doctype + html)
    }

    return fetchData().then(render).catch((err) => {
      console.log(err)
      res.status(500).end()
    })
  })
}
