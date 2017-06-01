import { PropTypes } from 'react'
import styled, { css } from 'styled-components'

export const colors = {
  primary: '#086FFF',
  primaryDark: '#1D52B3',
  // primary: '#1A8EFB',
  secondary: '#F17703',
  black: '#343534',
  grey: '#737373',
  lightGrey: '#a8a8a8',
  disabled: '#BBBBBB',
  border: '#EDEDED',
  divider: '#F7F8F8',
  background: '#F9F9F9',
  secondaryBackground: '#dedede',
  hover: '#F6F7F8',
  section: '#f6f6fa',

  link: '#01A8F8',
  linkDark: '#34639e',
  negative: '#910404',
  negativeBack: '#EE2525',
  positive: '#01BAA6',
  positiveBack: '#11f625',
  danger: '#FA0000',

  red: '#E25653',
  babyBlue: '#F5FCFF',
  borderBlue: '#00A7F7'
}

export const media = {
  handheld: (...args) => css`
    @media (max-width: 420px) {
      ${css(...args)}
    }
  `
}

const text = styled.div`
  font-family: 'Open Sans', sans-serif;
  ${props => props.color && `color: ${props.color || colors.black};`}
`
text.propsTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string
}
text.defaultProps = {
  color: null
}
export const sizes = {
  headline: `
    font-size: 48px
    line-height: 64px;
    font-weight: 400;
  `,
  title: `
    font-size: 36px;
    line-height: 50px;
    font-weight: 400;
  `,
  subtitle: `
    font-size: 24px;
    line-height: 24px;
    font-weight: 400;
  `,
  heading: `
    font-size: 18px;
    line-height: 24px;
    font-weight: 400;
  `,
  subheading: `
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
  `,
  label: `
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
  `,
  note: `
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
  `
}

export const marginObj = {
  title: 49,
  subtitle: 32,
  heading: 19,
  subheading: 28,
  label: 28
}

export const margins = {
  headline: 'margin-bottom: 18px',
  title: 'margin-bottom: 49px;',
  subtitle: 'margin-bottom: 32px;',
  heading: 'margin-bottom: 19px;',
  subheading: 'margin-bottom: 28px;',
  label: 'margin-bottom: 28px;'
}

export const type = {
  headline: styled(text)`
    ${sizes.headline};
  `,
  title: styled(text)`
    ${sizes.title}
  `,
  subtitle: styled(text)`
    ${sizes.subtitle}
  `,
  heading: styled(text)`
    ${sizes.heading}
  `,
  subheading: styled(text)`
    ${sizes.subheading}
  `,
  label: styled(text)`
    ${sizes.label}
  `,
  note: styled(text)`
    ${sizes.note}
  `
}

export const slider = `
  .rc-slider * {
    z-index: 9;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    position: absolute;
    right: 0;
    height: 100%;
  }
  
  .rc-slider-rail {
    position: absolute;
    height: 100%;
    background-color: #e9e9e9;
    width: 4px;
    right: -16px;
  }
  .rc-slider-track {
    position: absolute;
    right: -16px;
    width: 4px;
    border-radius: 6px;
    background-color: #abe2fb;
  }
  .rc-slider-step {
    position: absolute;
    right: -16px;
    height: 100%;
    width: 4px;
    background: transparent;
  }
  .rc-slider-handle {
    position: absolute;
    right: -22px;
    width: 12px;
    height: 12px;
    cursor: pointer;
    border-radius: 50%;
    border: solid 2px ${colors.primary};
    background-color: #fff;
  }
  .rc-slider-mark {
    position: absolute;
    left: 18px;
    left: 0;
    height: 100%;
    font-size: 12px;
  }
`
