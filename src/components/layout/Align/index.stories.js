import React from 'react'
import { storiesOf } from '@kadira/storybook'

import { colors, type } from '../../../utils/style'
import Align from './'

storiesOf('layout', module)
  .add('Align', () => (
    <Align>
      <type.heading>This should align this div</type.heading>
      <type.heading color={colors.primary}>&nbsp;and this div.</type.heading>
    </Align>
  ))
