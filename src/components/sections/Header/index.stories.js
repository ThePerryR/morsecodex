import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'

import AppStore from '../../../stores/AppStore'
import TestLayer from '../../../stores/TestLayer'
import Header from './'

const TransportLayer = new TestLayer()

const store = new AppStore({
  currentUserId: '123',
  users: [{_id: '123', image: 'http://cdn2.pitchfork.com/news/62697/647fed58.jpg'}]
}, {}, TransportLayer)

storiesOf('Sections', module)
  .addDecorator(withKnobs)
  .add('Header', () => (
    <Header store={store} location={{pathname: '/'}}/>
  ))
