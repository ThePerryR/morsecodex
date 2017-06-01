import { PropTypes } from 'react'
import styled from 'styled-components'

import { colors, type } from '../../../utils/style'

const TextButton = styled(type.label)`
  cursor: pointer;
  color: ${colors.primary};
  transition: color 120ms ease;
  ${props => props.disabled && `
    color: ${colors.disabled};
  `}
`

TextButton.propTypes = {
  disabled: PropTypes.bool
}
TextButton.defaultProps = {
  disabled: false
}

export default TextButton
