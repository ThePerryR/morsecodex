import React from 'react'
import styled from 'styled-components'

import { colors } from '../../../utils/style'

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  padding-left: 16px;
  padding-right: 16px;
  height: 40px;
  box-sizing: border-box;
  min-width: 88px;
  background: ${colors.primary};
  border: 2px solid ${colors.primary};
  color: white;
  transition: all 150ms linear;
  border-radius: 2px;
  white-space: nowrap;
  &:hover {
    background: white;
    color: ${colors.primary};
  }
  ${props => props.reverse && `
    background: white;
    color: ${colors.primary};
    &:hover {
      background: ${colors.primary};
      color: white;
    }
  `}
  ${props => props.disabled && `
    background: #cfcfcf;
    border-color: #cfcfcf;
    cursor: initial;
    color: #b1b1b1;
    &:hover {
      background: #cfcfcf;
      color: #b1b1b1;
    }
  `}
  ${props => props.small && `
    height: 32px;
    border-radius: 16px;
  `}
`

const Button = (props) =>
  <Wrapper
    {...props}
    onClick={(e) => {
      if (props.handleClick && !props.disabled) {
        props.handleClick(e)
      }
    }}>
    {props.label}
  </Wrapper>

Button.propTypes = {
  label: React.PropTypes.node.isRequired,
  background: React.PropTypes.oneOf(['primary', 'white']),
  raised: React.PropTypes.bool,
  flat: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  small: React.PropTypes.bool,
  handleClick: React.PropTypes.func
}
Button.defaultProps = {
  background: 'primary',
  raised: false,
  flat: false,
  disabled: false,
  handleClick: () => {}
}

export default Button
