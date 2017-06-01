import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { colors, type } from '../../../utils/style'

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
  background: ${colors.background};
  border-radius: 2px;
  transition: all 60ms ease-in;
  
  ${props => props.open && `
  background: ${colors.secondaryBackground}
  `}
`

const Top = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const Content = styled.div`
  height: 0;
  transition: all 120ms ease-in;
  overflow: hidden;
  ${props => props.open && `
    height: ${props.size * 40}px;
  `}
`

const NewButton = styled(type.label)`
  text-align: center;
  height: 40px;
  cursor: pointer;
  line-height: 40px;
  color: ${colors.primary};
  &:hover {
    color: ${colors.secondary};
  }
`

const Message = styled.div`
  height: 32px;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 4px;
  margin-bottom: 8px;
  box-sizing: border-box;
  cursor: pointer;
  
  ${props => props.open && `
    background: ${colors.primary};
    color: white;
  `}
`

const SectionEditor = ({section, lesson, open, openMessage, handleToggle, handleToggleMessage}) =>
  <Wrapper open={open}>
    <Top onClick={handleToggle}>
      <type.label color={colors.grey}>Unnamed Chapter</type.label>
    </Top>
    <Content open={open} size={section.messages.length + 1}>
      {section.messages.map(id =>
        <Message
          key={id.toString()}
          open={openMessage === id}
          onClick={() => handleToggleMessage(id)}>
          <type.label>{id.toString()}</type.label>
        </Message>
      )}
      <NewButton onClick={() => lesson.addMessageToSection(section._id)}>+ New Message</NewButton>
    </Content>
  </Wrapper>

export default observer(SectionEditor)
