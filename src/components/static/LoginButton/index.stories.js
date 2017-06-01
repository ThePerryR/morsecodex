import React from 'react'
import { storiesOf } from '@kadira/storybook'

import LoginButton from './'

storiesOf('Static', module)
  .add('LoginButton', () => (
    <LoginButton />
  ))
