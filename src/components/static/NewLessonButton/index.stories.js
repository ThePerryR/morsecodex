import React from 'react'
import { storiesOf } from '@kadira/storybook'

import AppStore from '../../../stores/AppStore'
import TestLayer from '../../../stores/TestLayer'
import NewLessonButton from './'

const TransportLayer = new TestLayer()
const store = new AppStore({}, {}, TransportLayer)

storiesOf('Static', module)
  .add('NewLessonButton', () => (
    <NewLessonButton
      store={store}
    />
  ))
