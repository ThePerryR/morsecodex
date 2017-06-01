import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { withKnobs, text } from '@kadira/storybook-addon-knobs'

import Input from './'

storiesOf('dom', module)
  .addDecorator(withKnobs)
  .add('Input', () => (
    <Input
      placeholder={text('Placeholder', 'Search for it')}
    />
  ))
