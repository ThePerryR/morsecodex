import React from 'react'
import styled from 'styled-components'

import { colors, type } from '../../../utils/style'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 98px;
  padding-bottom: 98px;
`

const Title = styled(type.title)`
  position: relative;
  text-transform: uppercase;
  padding-bottom: 4px;
  margin-bottom: 6px;
  &:after {
  content: "";
  background: ${colors.primary};
  position: absolute;
  height: 3px;
  width: 14px;
  left: 50%;
  margin-left: -12px;
  bottom: 0;
  }
`

const Input = styled.input`
  border: 1px solid #C3C3C3;
  height: 40px;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: inset 0 0 5px rgba(222,222,222,0.66);
  padding-left: 22px;
  padding-right: 22px;
  width: 336px;
  font-size: 12px;
  margin-top: 32px;
  text-align: center;
  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`

const SaveButton = styled.div`
  height: 40px;
  width: 336px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  text-transform: uppercase;
  color: white;
  background: ${colors.secondary};
  cursor: pointer;
  margin-top: 18px;
  border-radius: 20px;
  ${props => props.disabled && `
    background: #999999;
  `}
`

class EditName extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: ''
    }
  }

  save = () => {
    if (this.state.name) {
      this.props.close()
      this.props.lesson.name = this.state.name
      this.setState({name: ''})
      this.props.lesson.save()
    }
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.open && this.props.open && this.inputRef) {
      this.inputRef.focus()
    }
  }

  setRef = ref => {
    if (!this.inputRef) {
      ref.focus()
      this.inputRef = ref
    }
  }

  render () {
    return (
      <Wrapper>
        <Title color={this.props.lesson.name ? colors.black : colors.grey}>
          <b>{this.props.lesson.name || 'UNTITLED'}</b>
        </Title>
        <type.label color={colors.grey}><b>WHAT ARE YOU TEACHING?</b></type.label>
        <Input
          innerRef={this.setRef}
          placeholder="Choose a title for this page"
          value={this.state.name}
          onChange={e => this.setState({name: e.target.value})}
          onKeyPress={e => e.key === 'Enter' && this.save()}
        />
        <SaveButton
          onClick={this.save}
          disabled={!this.state.name}>
          <type.label color="white">Save Title</type.label>
        </SaveButton>
      </Wrapper>
    )
  }
}

export default EditName
