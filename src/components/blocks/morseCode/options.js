import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import Input from '../../dom/Input'
import Options, { Blocking, Extra } from '../Options'

const Wrapper = styled.div`
  width: 100%;
`

@observer
class MorseCodeOptions extends Options {
  update = (key, value) => {
    this.props.block[key] = value
    this.props.block.lesson.save()
  }

  render () {
    const {block, close} = this.props
    return (
      <Wrapper>
        <Input
          placeholder="Message to send"
          value={block.message || ''}
          onChange={(e) => {
            block.message = e.target.value
            block.lesson.save()
          }}
        />
        <Input
          placeholder="Label"
          value={block.label || ''}
          onChange={(e) => {
            block.label = e.target.value
            block.lesson.save()
          }}
        />

        <Blocking block={block}/>
        <Extra block={block} close={close}/>
      </Wrapper>
    )
  }
}

export default MorseCodeOptions
