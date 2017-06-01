import styled from 'styled-components'

export default styled.div`
  position: relative;
  height: 1px;
  width: 100%;
  margin-top: 31px;
  margin-bottom: 70px;
  background-color: #e6e6e6;
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100px;
    top: -30px;
  }
  ${props => props.block.small && `
    margin-top: 5px;
    margin-bottom: 43px;
    background-color: white;
    background-image: linear-gradient(to right, #b2b2b2, #b2b2b2 1px, transparent 1px, transparent 3px);
    background-repeat: repeat-x;
    background-position: left top;
    background-size: 4px 1px;
    &:after {
      top: -5px;
      height: 49px;
    }
  `}
`
