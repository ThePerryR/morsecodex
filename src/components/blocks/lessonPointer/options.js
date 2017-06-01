import React from 'react'
import styled from 'styled-components'

import Options, { Blocking, Extra } from '../Options'

const Wrapper = styled.div`
`

export default class extends Options {
  render () {
    const {block, close} = this.props
    return (
      <Wrapper>
        <Blocking block={block}/>
        <Extra block={block} close={close}/>
      </Wrapper>
    )
  }
}
