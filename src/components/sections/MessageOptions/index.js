import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { colors } from '../../../utils/style'

const Wrapper = styled.div`
  display: flex;
  width: 320px;
  border-left: 1px solid ${colors.border};
  flex-shrink: 0;
`

const MessageOptions = ({lesson}) =>
  <Wrapper/>

export default observer(MessageOptions)
