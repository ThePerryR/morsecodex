import styled from 'styled-components'

import { colors } from '../../../utils/style'

const Input = styled.input`
  width: 100%;
  height: 32px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 0;
  padding-bottom: 0;
  box-sizing: border-box;
  border: 2px solid ${colors.border};
  border-radius: 4px;
  
  font-size: 12px;
  font-weight: 500;
  transition: all 120ms ease-in;
  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
  ${props => props.disabled && `
  background: ${colors.background};
  color: ${colors.disabled}
  `}
`

export default Input
