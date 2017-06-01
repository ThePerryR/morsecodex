import React, { Component } from 'react'
import styled from 'styled-components'

import Input from '../../dom/Input'
import Align from '../../layout/Align'
import Button from '../../static/Button'
import Icon from '../../static/Icon'

const Wrapper = styled.div`
  
`

class EditInline extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      temp: ''
    }
  }

  toggle = (editing = !this.state.editing) => this.setState({editing})
  changeName = e => this.setState({temp: e.target.value})
  save = () => {
    this.props.handleSave(this.state.temp)
    this.cancel()
  }
  cancel = () => this.setState({editing: false, temp: ''})

  render () {
    return (
      <Wrapper>
        {this.state.editing
          ? (
            <Align>
              <Input
                small
                value={this.state.temp}
                onChange={this.changeName}
                onKeyPress={e => e.key === 'Enter' && this.save()}
              />
              <Button style={{marginLeft: 8, marginRight: 8}} small flat label="Save"
                      handleClick={this.save}/>
              <Button small label="Cancel" handleClick={this.cancel}/>
            </Align>
          )
          : (
            <Align>
              <div>{this.props.children}</div>
              {this.props.canEdit &&
              <Icon
                style={{marginLeft: 8, cursor: 'pointer'}}
                icon="edit"
                size="x-small"
                color="primary"
                onClick={this.toggle}
              />
              }
            </Align>
          )}
      </Wrapper>
    )
  }
}

export default EditInline
