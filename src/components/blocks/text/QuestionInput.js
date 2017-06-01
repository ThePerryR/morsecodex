import React, { Component } from 'react'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'

import { EditorState, AtomicBlockUtils } from 'draft-js'
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
      message: '',
      multiple: false,
      answers: [{
        correct: false,
      }]
    }
  }

  handleClickOutside = () => {
    this.props.handleClose()
  }

  apply = () => {
    const {editorState} = this.props
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'QUESTION',
      'IMMUTABLE',
      {
        type: 'question',
        message: this.state.message,
        multiple: this.state.multiple,
        answers: this.state.answers
      })
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(
      editorState,
      {currentContent: contentStateWithEntity}
    )
    this.props.handleApply(AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      ' '
    ))
  }

  render () {
    return (
      <Wrapper>
        <type.label>Question</type.label>
        <input
          value={this.state.message}
          onChange={e => this.setState({message: e.target.value})}
        />
        <div style={{display: 'flex'}}>
          <type.note>Multi Choice</type.note>
          <input
            type="checkbox"
            checked={this.state.multiple}
            onChange={e => this.setState({multiple: !this.state.multiple})}
          />
        </div>
        <type.label>Answers</type.label>
        {this.state.answers.map((answerObj, i) => {
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center'}}>
              <input
                value={answerObj.value || ''}
                onChange={(e) => {
                  const answers = [...this.state.answers]
                  answers[i].value = e.target.value
                  this.setState({answers})
                }}
              />
              <input
                type={this.state.multiple ? 'checkbox' : 'radio'}
                checked={answerObj.correct}
                name="correct"
                onChange={(e) => {
                  const answers = [...this.state.answers]
                  answers[i].correct = e.target.value
                  this.setState({answers})
                }}
              />
            </div>
          )
        })}
        <type.label
          onClick={() => {
            const answers = [...this.state.answers]
            answers.push({
              correct: false,
            })
            this.setState({answers})
          }}>
          Add Answer +
        </type.label>
        <type.label
          onClick={this.apply}>
          Add
        </type.label>
      </Wrapper>
    )
  }
}

export default onClickOutside(LinkInput)
