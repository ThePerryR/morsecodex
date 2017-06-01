import React, { Component } from 'react'
import startAudioContext from 'startaudiocontext'

const isMobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
// const MIN_SPEED = 60
// const MAX_SPEED = 320

export const letters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4',
  '5', '6', '7', '8', '9', '0',
  'SOS', 'Ä', 'Á', 'Å', 'Ch', 'É', 'Ñ', 'Ö', 'Ü',
  '.', ',', ':', '?', '\'', '-', '/', '"', '@', '=']
export const code = [
  '.-', // A
  '-...', // B
  '-.-.', // C
  '-..', // D
  '.', // E
  '..-.', // F
  '--.', // G
  '....', // H
  '..', // I
  '.---', // J
  '-.-', // K
  '.-..', // L
  '--', // M
  '-.', // N
  '---', // O
  '.--.', // P
  '--.-', // Q
  '.-.', // R
  '...', // S
  '-', // T
  '..-', // U
  '...-', // V
  '.--', // W
  '-..-', // X
  '-.--', // Y
  '--..', // Z
  '.----', // 1
  '..---', // 2
  '...--', // 3
  '....-', // 4
  '.....', // 5
  '-....', // 6
  '--...', // 7
  '---..', // 8
  '----.', // 9
  '-----', // 0
  '...---...', // SOS
  '.-.-', // Ä
  '.--.-', // Á
  '.--.-', // Å
  '----', // Ch,
  '..-..', // É
  '--.--', // Ñ,
  '---.', // Ö,
  '..--', // Ü
  '.-.-.-', // .
  '--..--', // ,
  '---...', // :
  '..--..', // ?
  '.----.', // '
  '-....-', // -
  '-..-.', // "/"
  '.-..-.', // "
  '.--.-.', // @
  '-...-' // =
]

function convertToString (message) {
  return message.map(word => word.map(letter => letters[code.indexOf(letter)]).join('')).join(' ')
}

function isLetter (sounds) {
  return !!letters[code.indexOf(sounds)]
}

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pressed: false,
      dotDuration: 90,
      tempMessage: [],
      tempWord: [],
      tempCharacter: ''
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyPress, false)
    document.addEventListener('keyup', this.handleKeyUp, false)
    window.addEventListener('blur', this.handleRelease, false)
    const Tone = require('tone')
    if (isMobileRegex.test(navigator.userAgent)) {
      startAudioContext(Tone.context, this.button)
    }
    this.synth = new Tone.AMSynth().toMaster()
    this.stopTone()
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyPress, false)
    document.removeEventListener('keyup', this.handleKeyUp, false)
    window.removeEventListener('keyup', this.handleRelease, false)
  }

  render () {
    const childrenWithProps = React.Children.map(this.props.children,
      (child, x) => {
        return React.cloneElement(child, {
          playing: this.state.pressed
        })
      }
    )
    return (
      <div
        className={this.props.className}
        ref={button => {
          this.button = button
        }}
        onMouseDown={this.handlePress}
        onMouseUp={this.handleRelease}
        onMouseLeave={this.handleRelease}
        onTouchStart={this.handlePress}
        onTouchEnd={this.handleRelease}
      >{childrenWithProps}</div>
    )
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 32 && !this.state.pressed) {
      this.handlePress(e)
    }
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 32) {
      this.handleRelease(e)
    }
  }

  handlePress = (e) => {
    if (this.props.disabled) {
      return
    }
    if (e.type === 'touchstart') {
      e.preventDefault()
    }
    if (!this.state.tempCharacter && this.props.handleBeginMessage) {
      this.props.handleBeginMessage()
    }
    clearTimeout(this.state.addCharacter)
    clearTimeout(this.state.sendWord)
    clearTimeout(this.state.sendMessage)
    this.setState({ pressed: Date.now() })
    this.startTone()
  }

  handleRelease = () => {
    if (this.props.disabled) {
      return
    }
    const { pressed, dotDuration, tempMessage, tempWord } = this.state
    let tempCharacter = this.state.tempCharacter
    if (pressed) {
      const duration = Date.now() - pressed

      if (duration > dotDuration) {
        tempCharacter += '-'
      } else {
        tempCharacter += '.'
      }

      const addCharacter = setTimeout(() => {
        if (isLetter(tempCharacter)) {
          this.setState({ tempWord: [...tempWord, tempCharacter], tempCharacter: '' })
        }
      }, dotDuration * 3)
      const sendWord = setTimeout(() => {
        this.setState({
          tempMessage: [...tempMessage, [...tempWord, tempCharacter]],
          tempWord: []
        })
      }, dotDuration * 7)
      const sendMessage = setTimeout(() => {
        this.setState({ tempMessage: [], tempWord: [], tempCharacter: '' })
        const message = convertToString([...tempMessage, [...tempWord, tempCharacter]])
        if (message) {
          this.props.handleAddMessage(message)
        }
      }, dotDuration * 14)

      this.setState({
        pressed: false,
        tempCharacter: tempCharacter.slice(0, 10),
        addCharacter,
        sendWord,
        sendMessage
      })
      this.stopTone()
    }
  }

  startTone = () => {
    this.synth.triggerAttack('A4')
  }

  stopTone = () => {
    this.synth.triggerRelease()
  }
}

export class Player extends Component {
  constructor (props) {
    super(props)
    this.state = {
      playing: false
    }
  }

  componentDidMount () {
    const Tone = require('tone')
    if (isMobileRegex.test(navigator.userAgent)) {
      startAudioContext(Tone.context, this.action)
    }
    this.synth = new Tone.AMSynth().toMaster()
    this.synth.triggerRelease()
    if (this.props.autoPlay) {
      this.play()
    }
  }

  componentDidUpdate (prevProps) {

  }

  play () {
    const word = this.props.message
    this.speed = 90
    this.letters = word.split('')
    this.playWord([...this.letters])
  }

  playWord (word) {
    this.setState({ playing: true })
    console.log(word)
    this.playLetter(code[letters.indexOf(word.shift())].split(''), () => {
      if (word.length) {
        this.playWord(word)
      } else {
        this.setState({ playing: false })
      }
    })
  }

  playLetter (letter, cb) {
    this.playSound(letter.shift(), () => {
      if (letter.length) {
        this.playLetter(letter, cb)
      } else if (cb) {
        setTimeout(() => {
          cb()
        }, this.speed * 3)
      }
    })
  }

  playSound (symbol, cb) {
    this.synth.triggerAttack('A4')
    setTimeout(() => {
      this.synth.triggerRelease()
      setTimeout(() => {
        if (cb) {
          cb()
        }
      }, this.speed)
    }, symbol === '.' ? this.speed : this.speed * 3)
  }

  render () {
    const childrenWithProps = React.Children.map(this.props.children,
      (child, x) => {
        return React.cloneElement(child, {
          playing: this.state.playing
        })
      }
    )
    return (
      <div
        ref={(action) => {
          this.action = action
        }}
        onClick={() => {
          if (!this.state.playing) {
            this.play()
          }
        }}>
        {childrenWithProps}
      </div>
    )
  }
}
