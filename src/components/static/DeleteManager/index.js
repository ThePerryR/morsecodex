import React, { Component } from 'react'

import { colors, type } from '../../../utils/style'
import Align from '../../layout/Align'

class DeleteManager extends Component {
  constructor (props) {
    super(props)
    this.state = {
      deleting: false
    }
  }

  render () {
    if (this.state.deleting) {
      return (
        <Align>
          <type.note color={colors.grey}>
            {this.props.message || 'Are you sure you want to delete this?'}&nbsp;
          </type.note>
          <type.note
            color={colors.danger}
            onClick={() => {
              this.props.delete()
              this.setState({deleting: false})
            }}
            style={{cursor: 'pointer'}}>
            &nbsp;Yes&nbsp;
          </type.note>
          <type.note color={colors.grey}>&nbsp;/&nbsp;</type.note>
          <type.note
            color={colors.black}
            onClick={() => this.setState({deleting: false})}
            style={{cursor: 'pointer'}}>
            &nbsp;No&nbsp;
          </type.note>
        </Align>
      )
    }
    return (
      <div onClick={() => this.setState({deleting: true})}>
        {this.props.children}
      </div>
    )
  }
}

export default DeleteManager
