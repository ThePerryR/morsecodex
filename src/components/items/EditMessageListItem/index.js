import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import { sortable } from 'react-sortable'
import styled from 'styled-components'

import { colors } from '../../../utils/style'
import Icon from '../../static/Icon'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  
  width: 100%;
  
  margin-bottom: 10px;
`

const MessageBarName = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Roboto', sans-serif;
  border-radius: 4px;
  background: #FBFCFC;
  padding: 8px 16px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background 120ms ease;
  margin-left: 10px;
  color: ${colors.grey};
  &:hover {
    background: #F7F9FA;
  }
  ${props => props.selected && `
     color: white;
     background: ${colors.primary};
     &:hover {
       background: ${colors.primary};
     }
  `}
`

const IconWrapper = styled.div`
  cursor: grab;
`

const EditMessageListItem = (props) =>
  <Wrapper {...props}>
    <IconWrapper>
      <Icon icon="bars" color={props.selected ? 'primary' : 'grey'} size="x-small"/>
    </IconWrapper>
    <MessageBarName
      selected={props.selected}
      onClick={props.handleClick}>
      <div>{props.message.name || `Unnamed message`}</div>
    </MessageBarName>
  </Wrapper>

EditMessageListItem.propTypes = {
  message: PropTypes.shape({}).isRequired,
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default sortable(observer(EditMessageListItem))
