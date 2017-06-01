import React, { PropTypes } from 'react'

import { colors } from '../../../utils/style'

const Logo = ({color, height, className, style}) =>
  <svg
    style={{height, width: height / 1.15, display: 'inline-flex', ...style}}
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    width='200px'
    height='230px'
    viewBox='0 0 200 230'
    version='1.1'>
    <polygon
      fill={color}
      points="100 0 200 60 200 170 114 222 114 136 138 150 150 124 114 102 160 102 172 78 28 78 40 102 86 102 50 124 62 150 86 136 86 222 0 170 0 60 100 0"
    />
  </svg>

Logo.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
}
Logo.defaultProps = {
  color: colors.primary,
  height: 26,
  style: {}
}

export default Logo
