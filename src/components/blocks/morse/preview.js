import React, { Component } from 'react'
import startAudioContext from 'startaudiocontext'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { type, colors } from '../../../utils/style'
import { convertToString, isLetter } from '../../../utils/morse-code'
import CorrectCount from '../../static/CorrectCount'

const isMobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 8px;
  box-sizing: border-box;
  margin-bottom: 28px;
`

const Message = styled.div`
  height: 24px;
  width: 180px;
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
  padding-left: 6px;
  padding-right: 6px;
  min-width: 80px;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 8px;
  color: #60d239;
  background: ${colors.positiveBack};
`

const Temp = styled.div`
  height: 24px;
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
  padding-left: 6px;
  padding-right: 6px;
  min-width: 80px;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 8px;
  color: ${colors.grey};
  background: ${colors.background};
`

const ToneButton = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: ${colors.negativeBack};
  cursor: pointer;
  box-shadow: none;
  transition: box-shadow 120ms ease-in;
  
  &:active {
    box-shadow: 0 0 6px red;
  }
`

const Complete = () =>
  <div
    style={{
      width: 320,
      background: colors.positiveBack,
      color: 'white',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 44,
      marginTop: 16,
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
    <type.note color="white">COMPLETE</type.note>
  </div>

@observer
class Morse extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pressed: false,
      dotDuration: 200,
      tempMessage: [],
      tempWord: [],
      tempCharacter: '',
      correctCount: 0
    }

    this.handlePress = this.handlePress.bind(this)
    this.handleRelease = this.handleRelease.bind(this)
  }

  componentDidMount () {
    window.addEventListener('blur', this.handleRelease, false)
    const Tone = require('tone')
    if (isMobileRegex.test(navigator.userAgent)) {
      startAudioContext(Tone.context, this.refs.button)
    }
    this.synth = new Tone.AMSynth().toMaster()
    this.stopTone()
    this.reset()
  }

  componentWillUnmount () {
    window.removeEventListener('keyup', this.handleRelease, false)
  }

  componentDidUpdate (prevProps) {
    const answerChanged = this.props.block.answer !== prevProps.block.answer
    if (answerChanged) {
      this.reset()
    }
  }

  correct = () => {
    const count = this.props.block.count || 1
    const correctCount = this.state.correctCount + 1
    this.setState({correctCount})
    if (correctCount >= count) {
      setTimeout(() => {
        this.props.next()
      }, 600)
    }
  }

  reset () {
    this.setState({
      correctCount: 0
    })
  }

  render () {
    const {tempCharacter, tempMessage, tempWord} = this.state
    const count = this.props.block.count || 1

    if (this.props.complete) {
      return <Complete />
    }

    return (
      <Wrapper>
        <Message>
          <type.label style={{lineHeight: '24px'}} color="#60d239">
            {convertToString(tempMessage)}&nbsp;
            <span style={{color: '#60d239 !important'}}>{convertToString([tempWord])}</span>
          </type.label>
        </Message>

        <Temp>{tempCharacter}</Temp>
        <ToneButton
          ref="button"
          onMouseDown={this.handlePress}
          onMouseUp={this.handleRelease}
          onMouseLeave={this.handleRelease}
          onTouchStart={this.handlePress}
          onTouchEnd={this.handleRelease}
        />
        {count > 1 && <CorrectCount total={count} correct={this.state.correctCount}/>}
      </Wrapper>
    )
  }

  handlePress (e) {
    if (e.type === 'touchstart') {
      e.preventDefault()
    }
    clearTimeout(this.state.addCharacter)
    clearTimeout(this.state.sendWord)
    clearTimeout(this.state.sendMessage)
    this.setState({pressed: Date.now()})
    this.startTone()
  }

  handleRelease () {
    const {pressed, dotDuration, tempWord} = this.state
    let tempCharacter = this.state.tempCharacter
    if (pressed) {
      const duration = Date.now() - pressed

      if (duration > dotDuration) {
        tempCharacter += '―'
      } else {
        tempCharacter += '•'
      }
      const addCharacter = setTimeout(() => {
        if (isLetter(tempCharacter)) {
          this.setState({tempWord: [...tempWord, tempCharacter], tempCharacter: ''})
        }
      }, dotDuration * 3)
      const sendWord = setTimeout(() => {
        if (convertToString([[...tempWord, tempCharacter]]) === this.props.block.answer) {
          this.correct()
        }
        this.setState({tempWord: [], tempCharacter: ''})
      }, dotDuration * 7)
      this.setState({
        pressed: false,
        tempCharacter: tempCharacter.slice(0, 10),
        addCharacter,
        sendWord
      })
      this.stopTone()
    }
  }

  startTone () {
    this.synth.triggerAttack('A4')
  }

  stopTone () {
    this.synth.triggerRelease()
  }
}

export default Morse
