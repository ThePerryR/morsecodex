import React, { Component } from 'react'
import styled from 'styled-components'

import { colors } from '../../utils/style'
import Icon from '../static/Icon'

const InnerIcon = styled(Icon)`
`

const StyledIconWrapper = styled.div`
  height: 28px;
  width: 28px;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  transition: all 150ms linear;
  &:hover {
    box-shadow: 0 0 4px rgba(0,0,0,0.2);
    background: white;
    z-index: 1;
  }
  &:active {
    box-shadow: inset 0 0 4px rgba(0,0,0,0.2);
  }
  ${props => props.selected && `
    box-shadow: inset 0 0 4px rgba(0,0,0,0.2);
    background: ${colors.border};
    &:hover {
      background: ${colors.border};
      box-shadow: inset 0 0 4px rgba(0,0,0,0.2);
    }
  `}
  
  ${props => props.disabled && `
    box-shadow: none;
    background: ${colors.disabled};
    opacity: 0.2;
    &:hover {
      background: ${colors.disabled};
      box-shadow: none;
    }
  `}
`

export const StyledIcon = ({icon, onClick, selected, disabled}) =>
  <StyledIconWrapper onClick={onClick} selected={selected} disabled={disabled}>
    <InnerIcon icon={icon} size="small"/>
  </StyledIconWrapper>

export default class extends Component {

}

export const OptionSection = styled.div`
  padding: 4px;
  display: flex;
  align-items: center;
  border-top: 1px solid ${colors.grey};
  border-bottom: 1px solid ${colors.grey};
  border-right: 1px solid ${colors.grey};
  &:first-child {
    border-left: 1px solid ${colors.grey};
  }
`

export const OptionIcons = ({block, extra, setSelectedTo}) => {
  const currentIndex = block.lesson.blocks.indexOf(block)
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {extra}
      <OptionSection>
        <StyledIcon
          icon="moveUp"
          disabled={currentIndex === 0}
          onClick={() => {
            setSelectedTo(block.lesson.move(currentIndex, currentIndex - 1))
          }}
        />
        <StyledIcon
          icon="moveDown"
          disabled={currentIndex === block.lesson.blocks.length}
          onClick={() => {
            setSelectedTo(block.lesson.move(currentIndex, currentIndex + 1))
          }}
        />
        <StyledIcon
          icon="moveToStart"
          disabled={!currentIndex}
          onClick={() => {
            setSelectedTo(block.lesson.move(currentIndex, 0))
          }}
        />
        <StyledIcon
          icon="moveToEnd"
          disabled={currentIndex === block.lesson.blocks.length}
          onClick={() => {
            setSelectedTo(block.lesson.move(currentIndex, block.lesson.blocks.length - 1))
          }}
        />
      </OptionSection>
      <OptionSection>
        <StyledIcon icon="delete"/>
      </OptionSection>
    </div>
  )
}
