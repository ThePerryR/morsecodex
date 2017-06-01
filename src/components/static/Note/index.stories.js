import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { withKnobs, text, select } from '@kadira/storybook-addon-knobs'

import { type } from '../../../utils/style'

import Note from './'

storiesOf('Static', module)
  .addDecorator(withKnobs)
  .add('Note', () => (
    <Note type={select('type', ['default', 'positive', 'negative'])}>
      <type.label>{text('children', 'Submitting this account')}</type.label>
    </Note>
  ))
