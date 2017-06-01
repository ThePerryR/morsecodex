import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  background: white;
  border-radius: 6px;
  width: 280px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  border: 1px solid #eaeaea;
  padding-top: 6px;
  padding-bottom: 6px;
`

const Menu = ({children, style, className}) =>
  <Wrapper style={style} className={className}>
    {children}
  </Wrapper>

export default Menu
