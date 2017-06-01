import styled from 'styled-components'

export default styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-image: url("${props => props.image}");
  background-size: cover;
  background-position: center;
`
