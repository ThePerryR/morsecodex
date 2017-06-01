import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { withKnobs, text } from '@kadira/storybook-addon-knobs'

import PageTitle from './'

storiesOf('Section', module)
  .addDecorator(withKnobs)
  .add('PageTitle', () => (
    <PageTitle
      title={text('Title', 'Page Title')}
    />
  ))
