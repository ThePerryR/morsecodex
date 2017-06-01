import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

const Html = ({styles, assets, state, content}) => {
  const helmet = Helmet.rewind()
  const attrs = helmet.htmlAttributes.toComponent()
  return (
    <html {...attrs}>
    <head>
      {helmet.title.toComponent()}
      {helmet.meta.toComponent()}
      <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"/>
      {helmet.link.toComponent()}
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet"/>
      <style dangerouslySetInnerHTML={{__html: styles}}/>
      <script>{`(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/nsl7bvl8';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()`}</script>
    </head>
    <body>
    <main id="app" dangerouslySetInnerHTML={{__html: content}}/>
    <script id="is" type="application/json">{state}</script>
    {Object.keys(assets.javascript).reverse().map((key) =>
      <script key={key} src={assets.javascript[key]}/>
    )}
    </body>
    </html>
  )
}

Html.propTypes = {
  styles: PropTypes.string.isRequired,
  assets: PropTypes.object.isRequired,
  state: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

export default Html
