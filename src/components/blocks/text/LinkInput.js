import React, { Component } from 'react'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'

import { EditorState, RichUtils } from 'draft-js'
import { colors, type } from '../../../utils/style'
import Button from '../../static/Button'

const Wrapper = styled.div`
  background: white;
  border: 1px solid ${colors.border};
  border-radius: 4px;
  padding: 16px;
  box-sizing: border-box;
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const Label = styled(type.label)`
  margin-right: 8px;
`

const Input = styled.input`
  
`

class LinkInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      urlValue: ''
    }
  }

  handleClickOutside = () => {
    this.props.handleClose()
  }

  apply = () => {
    const {editorState} = this.props
    const {urlValue} = this.state
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      {url: urlValue}
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {currentContent: contentStateWithEntity})
    this.props.handleApply(RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    ))
  }

  render () {
    return (
      <Wrapper>
        <Row>
          <Label>Link</Label>
          <Input
            value={this.state.urlValue}
            onChange={e => this.setState({urlValue: e.target.value})}
          />
          <Button small label="Apply" handleClick={this.apply} disabled={!this.state.urlValue}/>
        </Row>
      </Wrapper>
    )
  }
}

export default onClickOutside(LinkInput)
