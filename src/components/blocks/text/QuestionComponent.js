import React, { Component } from 'react'
import styled from 'styled-components'

import { colors, type } from '../../../utils/style'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Answer = styled(type.label)`
  height: 32px;
  width: 100%;
  border: 1px solid ${colors.border};
  margin-bottom: 8px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 150ms linear;
  &:hover {
    background: ${colors.background};
  }
`

class QuestionComponent extends Component {
  render () {
    return (
      <Wrapper>
        <type.label style={{marginBottom: 16}}><b>{this.props.message}</b></type.label>
        {this.props.answers.map((answer, i) => {
          return (
            <Answer key={i}>{answer.value}</Answer>
          )
        })}
      </Wrapper>
    )
  }
}

const AtomicComponent = (props) => {
  const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
  )
  const type = entity.getType()
  const data = entity.getData()
  if (type === 'QUESTION') {
    return <QuestionComponent {...data} />
  }
}

export default AtomicComponent
