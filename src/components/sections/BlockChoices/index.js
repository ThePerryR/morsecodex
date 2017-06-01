import React from 'react'
import styled from 'styled-components'

import { colors, type } from '../../../utils/style'

const Wrapper = styled.div`
  padding-top: 24px;
  padding-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`

const Choice = styled(type.label)`
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  margin-left: 8px;
  margin-right: 8px;
  background: ${colors.babyBlue};
  border: 1px dashed ${colors.borderBlue};
  color: ${colors.primary};
  cursor: pointer;
  ${props => props.solid && `
  border-style: solid;
  `}
`

const BlockChoices = ({handleSelect}) =>
  <Wrapper>
    <Choice onClick={() => handleSelect('text')}>+ Text Block</Choice>
    <Choice onClick={() => handleSelect('text')}>+ Image Block</Choice>
    <Choice onClick={() => handleSelect('text')}>+ Video Block</Choice>
    <Choice solid onClick={() => handleSelect('text')}>More Choices</Choice>
  </Wrapper>

export default BlockChoices
