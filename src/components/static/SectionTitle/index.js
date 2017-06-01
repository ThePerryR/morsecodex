import React from 'react'
import styled from 'styled-components'

import { colors, type } from '../../../utils/style'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled(type.title)`
  position: relative;
  padding-bottom: 4px;
  margin-bottom: 6px;
  &:after {
  content: "";
  background: ${props => props.colorOverride || colors.primary};
  position: absolute;
  height: 3px;
  width: 14px;
  left: 50%;
  margin-left: -12px;
  bottom: 0;
  }
`

const SectionTitle = ({title, subtitle, colorOverride}) =>
  <Wrapper>
    <Title
      colorOverride={colorOverride}
      color={colorOverride || colors.black}>
      <b>{title}</b>
    </Title>
    <type.label
      style={{marginBottom: 42, textTransform: 'uppercase'}}
      color={colorOverride || colors.grey}>
      <b>{subtitle}</b>
    </type.label>
  </Wrapper>

export default SectionTitle
