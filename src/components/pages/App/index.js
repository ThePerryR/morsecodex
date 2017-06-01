import React, { Component } from 'react'
import { observer } from 'mobx-react'
import styled, { injectGlobal } from 'styled-components'
import startAudioContext from 'startaudiocontext'

import Header from '../../sections/Header'
import { colors, type } from '../../../utils/style'
import { convertToString, isLetter } from '../../../utils/morse-code'
import Logo from '../../static/Logo'

const isMobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
`

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 288px;
  padding: 24px;
  box-sizing: border-box;
  border-right: 1px solid ${colors.border};
`

const Main = styled.div`
  flex: 1;
  background: white;
  display: flex;
  flex-direction: column;
`

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  padding-top: 16px;
  padding-bottom: 16px;
  box-sizing: border-box;
  background: #E6F1FF;
  user-select: none;
  cursor: pointer;
`

const Button = styled.div`
  margin-bottom: 16px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #1682FF;
  transition: all 150ms linear;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => props.pressed && `
    box-shadow: 0 0 16px rgba(22, 130, 255, 0.8);
    background: #7db9ff;
  `}
`

const Footer = styled.div`
  display: flex;
  margin-top: 12px;
`

@observer
class App extends Component {
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
    document.onkeyup = (e) => {
      e = e || window.event
      if (e.keyCode === 32) {
        this.handleRelease()
      }
    }
    document.onkeydown = (e) => {
      e = e || window.event
      if (e.keyCode === 32) {
        this.handlePress()
      }
    }
    window.addEventListener('blur', this.handleRelease, false)
    const Tone = require('tone')
    if (isMobileRegex.test(navigator.userAgent)) {
      startAudioContext(Tone.context, this.refs.button)
    }
    this.synth = new Tone.AMSynth().toMaster()
    this.stopTone()
    this.reset()
  }

  reset () {
    this.setState({
      correctCount: 0
    })
  }

  componentWillMount () {
    this.props.store.router = this.props.router
    injectGlobal`
      body {
        margin: 0;
        color: #3c3c3c;
      }
    `
  }

  componentWillUnmount () {
    window.removeEventListener('keyup', this.handleRelease, false)
  }

  componentDidUpdate (prevProps) {

  }

  render () {
    return (
      <Wrapper>
        <SideBar>
          <div style={{flex: 1}}/>
          <ButtonSection
            onMouseDown={this.handlePress}
            onMouseUp={this.handleRelease}
            onMouseOut={this.handleRelease}
            onTouchStart={this.handlePress}
            onTouchEnd={this.handleRelease}>
            <Button
              pressed={this.state.pressed}>
              <Logo color="white" height={24}/>
            </Button>
            <type.subheading style={{marginBottom: 4}}><b>Click To Send</b></type.subheading>
            <type.label>Or press space bar</type.label>
          </ButtonSection>
          <Footer>
            <type.note>
              <a
                href="https://www.teachok.com"
                style={{color: colors.disabled, textDecoration: 'none'}}>
                Created by <span style={{textDecoration: 'underline'}}>TeachOK Inc</span>
              </a>
            </type.note>
          </Footer>
        </SideBar>
        <Main>
          {this.props.children}
        </Main>
      </Wrapper>
    )
  }

  handlePress (e = {}) {
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
        console.log(convertToString([[...tempWord, tempCharacter]]), '<------')
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

export default App
