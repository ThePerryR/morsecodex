import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import MorseCodePreview from './preview'
import Editor from '../Editor'

const Wrapper = styled.div`
  width: 100%;
`

class MorseCodeEditor extends Editor {
  render () {
    const {block} = this.props
    return (
      <Wrapper>
        <MorseCodePreview block={block}/>
      </Wrapper>
    )
  }
}

export default observer(MorseCodeEditor)
