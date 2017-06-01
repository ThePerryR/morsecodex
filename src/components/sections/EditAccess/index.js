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

const Choice = styled.div`
  width: 320px;
  height: 40px;
  border: 2px solid #E6E6E6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 20px;
`

class EditAccess extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  setAccess = access => {
    const {lesson} = this.props
    if (access === 'anyone') {
      lesson.active = true
      lesson.private = false
    } else if (access === 'url') {
      lesson.active = true
      lesson.private = true
    } else {
      lesson.active = false
      lesson.private = true
    }
    lesson.save(true)
    this.props.close()
  }

  render () {
    return (
      <Wrapper>
        <Title color={colors.black}>
          <b>Access</b>
        </Title>
        <type.label style={{marginBottom: 32}} color={colors.grey}>
          <b>WHO CAN ACCESS THIS PAGE?</b>
        </type.label>
        <Choice onClick={this.setAccess.bind(null, 'anyone')}>
          <type.label>Anyone</type.label>
        </Choice>
        <Choice onClick={this.setAccess.bind(null, 'url')}>
          <type.label>Anyone with the URL</type.label>
        </Choice>
        <Choice onClick={this.setAccess.bind(null, 'private')}>
          <type.label>Only Me</type.label>
        </Choice>
      </Wrapper>
    )
  }
}

export default EditAccess
