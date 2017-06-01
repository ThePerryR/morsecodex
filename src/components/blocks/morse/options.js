import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import Input from '../../dom/Input'
import Options, {Blocking, Extra} from '../Options'

const Wrapper = styled.div`
  width: 100%;
`

@observer
class MorseOptions extends Options {
  update = (key, value) => {
    this.props.block[key] = value
    this.props.block.lesson.save()
  }

  render () {
    const {block, close} = this.props
    return (
      <Wrapper>
        <Input
          style={{marginBottom: 16}}
          placeholder="Correct Answer"
          value={block.answer || ''}
          onChange={(e) => {
            block.answer = e.target.value
            block.lesson.save()
          }}
        />
        <Input
          style={{marginBottom: 16}}
          placeholder="Correct answers needed"
          value={block.count || 1}
          onChange={(e) => {
            block.count = Number(e.target.value)
            block.lesson.save()
          }}
        />
        <Blocking block={block}/>
        <Extra block={block} close={close}/>
      </Wrapper>
    )
  }
}

export default MorseOptions
