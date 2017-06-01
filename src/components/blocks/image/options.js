import React from 'react'
import { observer } from 'mobx-react'
import { Extra } from '../Options'

export default observer(({block, close}) =>
  <div>
    <input value={block.url || ''} onChange={(e) => {
      block.url = e.target.value
      block.lesson.save()
    }}
    />
    <Extra block={block} close={close}/>
  </div>)
