import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { withKnobs, color, number } from '@kadira/storybook-addon-knobs'

import { colors } from '../../../utils/style'

import Logo from './'

storiesOf('Static', module)
  .addDecorator(withKnobs)
  .add('Logo', () => (
    <Logo
      color={color('color', colors.primary)}
      height={number('height', 56)}
    />
  ))
