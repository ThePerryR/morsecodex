import React from 'react'
import { observer } from 'mobx-react'

import Preview from './preview'

export default observer((props) =>
  <div style={{opacity: props.block.small ? 1 : 1}}>
    <Preview block={props.block}/>
  </div>
)
