import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import { colors, type } from '../../../utils/style'
import answers from '../../answers'
import questions from '../../questions'

const Wrapper = styled.div`
  display: none;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
  background: ${colors.section};
  ${props => props.open && `
    display: flex;
  `}
`

const AdvancedMessageOptions = ({message, open}) =>
  <Wrapper open={open}>
    <div>
      <type.note>Message Type</type.note>
      <select
        value={message.questionType}
        onChange={e => {
          message.questionType = e.target.value
          message.store.store.TransportLayer.updateMessage(message)
        }}>
        {Object.keys(questions).map((key, i) => {
          return (
            <option key={i} value={key}>{questions[key].label}</option>
          )
        })}
      </select>
    </div>
    <div style={{marginLeft: 16}}>
      <type.note>Answer Type</type.note>
      <select
        value={message.answerType}
        onChange={e => {
          message.answerType = e.target.value
          message.store.store.TransportLayer.updateMessage(message)
        }}>
        {Object.keys(answers).map((key, i) => {
          return (
            <option key={i} value={key}>{answers[key].label}</option>
          )
        })}
      </select>
    </div>
  </Wrapper>

export default observer(AdvancedMessageOptions)
