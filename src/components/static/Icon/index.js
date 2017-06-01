import { PropTypes } from 'react'
import styled from 'styled-components'

const icons = [
  ['delete', 'edit', 'right', 'left', 'dots', 'star', 'starFill', 'down', 'up', 'play', 'pause', 'locked', 'unlocked', 'more', 'cooking', 'math', 'science', 'home', 'bars', 'hat'],
  ['error', 'art', 'crown', 'user', 'leftTextAlign', 'centerTextAlign', 'rightTextAlign', 'justifyTextAlign', 'bold', 'italics', 'moveToEnd', 'moveToStart', 'moveDown', 'moveUp', 'expand', 'dashboard', 'link', 'question']
]
export const allIcons = icons.reduce((acc, val) => acc.concat(val), [])

const positions = {}

icons.forEach((row, r) => {
  row.forEach((icon, c) => {
    positions[icon] = {
      normal: `-${c * 20}px -${r * 20}px`,
      small: `-${c * 16}px -${r * 16}px`,
      'x-small': `-${c * 12}px -${r * 12}px`
    }
  })
})

const Icon = styled.i`
  width: 20px;
  height: 20px;
  display: inline-block;
  background-size: 400px 400px;
  background-image: url("/icons-${props => props.color}.svg");
  background-position: ${props => positions[props.icon][props.size]};
  transform-origin: top left;

  ${props => props.size === 'small' && `
    width: 16px;
    height: 16px;
    background-size: 320px 320px;
  `}
  ${props => props.size === 'x-small' && `
    width: 12px;
    height: 12px;
    background-size: 240px 240px;
  `}
`

Icon.propTypes = {
  icon: PropTypes.oneOf(allIcons).isRequired,
  size: PropTypes.oneOf(['normal', 'small', 'x-small']),
  color: PropTypes.oneOf(['primary', 'white', 'grey', 'black'])
}
Icon.defaultProps = {
  size: 'normal',
  color: 'grey'
}

export default Icon
