import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

import { colors, type } from '../../../utils/style'

const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  background: ${colors.primary};
  padding: 2px 12px;
  border-radius: 2px;
`

export default () =>
  <StyledLink to="/login">
    <type.label color="white">Join / Login</type.label>
  </StyledLink>
