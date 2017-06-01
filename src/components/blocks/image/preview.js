import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 800px;
  max-height: 800px;
  margin-bottom: 24px;
`

export default ({block}) =>
  <Wrapper>
    {block.url &&
    <img src={block.url}/>
    }
  </Wrapper>
