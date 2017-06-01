import React, { Component } from 'react'
import styled from 'styled-components'

import { colors, type } from '../../../utils/style'

const Wrapper = styled.div`
   padding: 20px 26px;
   border: 2px solid #D9D9D9;
   box-sizing: border-box;
   margin-top: 48px;
   margin-bottom: 16px;
`

const Circle = (props) =>
  <div style={{
    width: 12,
    height: 12,
    lineHeight: '11px',
    fontSize: 12,
    marginRight: 6,
    borderRadius: '50%',
    background: colors.primary,
    color: 'white',
    textAlign: 'center'
  }}>
    {props.children}
  </div>

const Choice = ({label, description, onClick}) =>
  <div style={{display: 'flex', alignItems: 'center', marginBottom: 14, cursor: 'pointer'}}
       onClick={onClick}>
    <Circle>+</Circle>
    <type.note>{label}&nbsp;</type.note>
    <type.note color={colors.grey}> - {description}</type.note>
  </div>

class BlockChooser extends Component {
  render () {
    const {choose} = this.props
    return (
      <Wrapper>
        <type.heading style={{marginBottom: 16, fontWeight: 500}} color={colors.black}>
          NEW BLOCK
        </type.heading>
        <Choice
          label="Text"
          onClick={() => choose('text')}
          description="Add a text box to your page. You can change the font size, weight and more."
        />
        <Choice
          label="Image"
          onClick={() => choose('image')}
          description="Add an image to your page. Enter a URL or upload a new image."
        />
        <Choice
          label="Divider"
          onClick={() => choose('divider')}
          description="Adds a line to your page to separate sections."
        />
        <Choice
          label="Lesson Pointer"
          onClick={() => choose('lessonPointer')}
          description="Add another lesson to your lesson."
        />
        <Choice
          label="Morse Code (Receive)"
          onClick={() => choose('morseCode')}
          description="Add a play button that will play morse code."
        />
        <Choice
          label="Morse Code (Send)"
          onClick={() => choose('morse')}
          description="Add a button that allows the student to send morse code."
        />
      </Wrapper>
    )
  }
}

export default BlockChooser
