import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { colors } from '../../../utils/style'

const Wrapper = styled.div`
  padding: 16px;
  box-sizing: border-box;
  background: ${colors.babyBlue};
  color: ${colors.link};
  transition: all 120ms ease-in;
  font-size: 13px;
  line-height: 20px;
  border: 2px solid ${colors.borderBlue};
  ${props => props.type === 'positive' && `
    background: ${colors.positiveBack};
    color: ${colors.positive};
  `}
  ${props => props.type === 'negative' && `
    background: ${colors.negativeBack};
    color: white;
  `}
`

const Note = (props) =>
  <Wrapper {...props}>
    {props.children}
  </Wrapper>

Note.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['default', 'positive', 'negative'])
}
Note.defaultProps = {
  type: 'default'
}

export default Note
