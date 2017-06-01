import React from 'react'
import styled from 'styled-components'

import { colors } from '../../../utils/style'

const Wrapper = styled.div`
  display: flex;
  margin-left: -8px;
  margin-right: -8px;
  margin-top: 16px;
`

const Count = styled.div`
  width: 16px;
  height: 16px;
  margin-left: 8px;
  margin-right: 8px;
  color: ${colors.grey};  
  background: ${colors.background};
  line-height: 16px;
  text-align: center;
  border-radius: 50%;
  font-size: 10px;
  ${props => props.correct && `
    background: #60d239;
    color: white;
  `}
`

const CorrectCount = ({total, correct}) => {
  const counts = []
  for (let i = 0; i < total; i++) {
    counts.push(<Count key={i} correct={correct > i}>{correct > i ? '✔' : '?'}</Count>)
  }
  return (
    <Wrapper>
      {counts}
    </Wrapper>
  )
}

CorrectCount.propTypes = {
  total: React.PropTypes.number.isRequired,
  correct: React.PropTypes.number.isRequired
}

export default CorrectCount
