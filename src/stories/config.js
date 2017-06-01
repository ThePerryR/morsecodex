import React from 'react'
import { configure, addDecorator } from '@kadira/storybook'

function loadStories () {
  require('./')
}

addDecorator((story) =>
  <div style={{
    background: 'white',
    position: 'absolute',
    height: '100%',
    width: '100%'
  }}>{story()}</div>
)

configure(loadStories, module)
