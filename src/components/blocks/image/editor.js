import React from 'react'
import { observer } from 'mobx-react'

export default observer((props) =>
  <div style={{width: 80, height: 80, background: 'pink', opacity: 0.2, overflow: 'hidden'}}>
    <img src={props.block.url}/>
  </div>
)
