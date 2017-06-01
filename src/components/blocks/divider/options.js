import React from 'react'
import {observer} from 'mobx-react'
import { Extra } from '../Options'

export default observer(({block, close}) =>
  <div>
    <div
      onClick={() => {
        block.small = !block.small
        block.lesson.save()
      }}>small
    </div>
    <Extra block={block} close={close}/>
  </div>)
