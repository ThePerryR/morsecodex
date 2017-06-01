import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

import { colors, type } from '../../../utils/style'
import Logo from '../Logo'

const Wrapper = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`

const CombinationLogo = (props) =>
  <Wrapper to="/" {...props}>
    <Logo color={colors.disabled} style={{marginRight: 8}}/>
    <type.heading color={colors.disabled}><b>TeachOK</b></type.heading>
  </Wrapper>

export default CombinationLogo
