import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { type, colors } from '../../../utils/style'

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
  margin-top: 32px;
`

const PageTitle = ({title}) =>
  <Wrapper>
    <type.title color={colors.grey}>{title}</type.title>
  </Wrapper>

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
}

export default PageTitle
