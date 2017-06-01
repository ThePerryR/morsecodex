import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { colors, type } from '../../utils/style'
import DeleteManager from '../static/DeleteManager'

export default class extends Component {
  ref = null
  setRef = (ref) => {
    this.ref = ref
  }

  componentDidMount () {
    this.move()
  }

  change = (e, field) => {
    this.props.block[field] = e.target.value
  }

  move = () => {
    if (this.ref) {
      console.log(this.ref.offsetTop, this.ref.clientTop, this.ref.offsetHeight, this.ref.clientHeight, this.ref.scrollHeight)
    }
  }
}

export const Blocking = observer(({block}) => {
  return (
    <div>
      <div>Should this block?</div>
      <input
        type="checkbox"
        checked={block.blocking || false}
        onChange={() => {
          block.blocking = !block.blocking
          block.lesson.save()
        }}
      />
    </div>
  )
})

export const Extra = ({block, close}) => {
  return (
    <div style={{
      background: colors.background,
      padding: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <DeleteManager
        delete={() => {
          const index = block.lesson.blocks.findIndex(b => b === block)
          if (index >= 0) {
            block.lesson.blocks.splice(index, 1)
            block.lesson.save()
            close()
          }
        }}>
        <type.note color={colors.negative} style={{cursor: 'pointer'}}>Delete</type.note>
      </DeleteManager>
    </div>
  )
}
