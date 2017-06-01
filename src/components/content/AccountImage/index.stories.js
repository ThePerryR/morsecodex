import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'

import AccountImage from './'

storiesOf('Content', module)
  .addDecorator(withKnobs)
  .add('AccountImage', () => (
    <AccountImage
      account={object('Account', {id: '123', image: 'http://cdn2.pitchfork.com/news/62697/647fed58.jpg'})}
    />
  ))
