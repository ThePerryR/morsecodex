import React from 'react'
import styled, { keyframes } from 'styled-components'

const dotloader = keyframes`
  0%,20% {
    width: 4px;
    height: 4px;
    border-radius: 2px;
    left: 0%;
    background-color: rgba(0, 0, 0, 0);
  }
  
  30%,70% {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    left: 50%;
    background-color: rgba(0, 0, 0, 0.36);
  }

  80%,100% {
    width: 4px;
    height: 4px;
    border-radius: 2px;
    left: 100%;
    background-color: rgba(0, 0, 0, 0);
  }
`

const Wrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 10px;
`
const Circle = styled.div`
  display: inline-block;
  position: relative;
  animation: ${dotloader} 2.5s infinite;
  ${props => props.second && `
    margin-left: -25px;
    animation: ${dotloader} 2.5s 0.2s infinite;
  `}
  ${props => props.third && `
    margin-left: -25px;
    animation: ${dotloader} 2.5s 0.4s infinite;
  `}
  ${props => props.fourth && `
    margin-left: -25px;
    animation: ${dotloader} 2.5s 0.6s infinite;
  `}
`

export default (props) =>
  <Wrapper {...props}>
    <Circle>&nbsp;</Circle>
    <Circle second>&nbsp;</Circle>
    <Circle third>&nbsp;</Circle>
    <Circle fourth>&nbsp;</Circle>
  </Wrapper>
