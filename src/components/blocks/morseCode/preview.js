import React, { Component } from 'react'
import styled from 'styled-components'
import startAudioContext from 'startaudiocontext'
import { observer } from 'mobx-react'

import { colors, type } from '../../../utils/style'
import Icon from '../../static/Icon'
import { letters, code } from '../../../utils/morse-code'

const isMobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 28px;
  cursor: pointer;
  .text {
    color: ${colors.black};
    transition: color 150ms linear;
  }
  &:hover {
    .text {
      color: ${colors.primary};
    }
  }
`

const Action = styled.div`
  background: ${colors.primary};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`
@observer
class MorseCodePreview extends Component {
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
    if (this.props.block.auto) {
      this.play()
    }
  }

  componentDidUpdate (prevProps) {
    // TODO check for new message and call play
  }

  pause () {
    clearTimeout(this.timeout)
    this.synth.triggerRelease()
    this.setState({playing: false})
    this.props.next()
  }

  play () {
    const message = this.props.block.message.toUpperCase()
    this.speed = 100
    const words = message.split(' ')
    this.playWords(words)
  }

  playWords (words) {
    if (words && words[0]) {
      this.letters = words[0].split('')
      words.shift()
      this.playWord(([...this.letters]), () => {
        if (words.length) {
          this.timeout = setTimeout(() => {
            this.playWords(words)
          }, this.speed * 7)
        } else {
          this.setState({playing: false})
          if (!this.props.complete) {
            this.props.next()
          }
        }
      })
    } else {
      this.setState({playing: false})
      if (!this.props.complete) {
        this.props.next()
      }
    }
  }

  playWord (word, cb) {
    this.setState({playing: true})
    this.playLetter(code[letters.indexOf(word.shift())].split(''), () => {
      if (word.length) {
        this.playWord(word, cb)
      } else {
        cb()
      }
    })
  }

  playLetter (letter, cb) {
    this.playSound(letter.shift(), () => {
      if (letter.length) {
        this.playLetter(letter, cb)
      } else if (cb) {
        this.timeout = setTimeout(() => {
          cb()
        }, this.speed * 3)
      }
    })
  }

  playSound (symbol, cb) {
    this.synth.triggerAttack('A4')
    this.timeout = setTimeout(() => {
      this.synth.triggerRelease()
      this.timeout = setTimeout(() => {
        if (cb) {
          cb()
        }
      }, this.speed)
    }, symbol === '•' ? this.speed : this.speed * 3)
  }

  render () {
    const message = this.props.block.message || ''
    const label = this.props.block.label || `Click to play ${message} in morse code`
    return (
      <div style={{width: '100%'}}>
        <Content
          onClick={() => {
            if (!this.state.playing) {
              this.play()
            } else {
              this.pause()
            }
          }}>
          <Action
            ref={(action) => {
              this.action = action
            }}>
            <Icon size="x-small" color="white" icon={this.state.playing ? 'pause' : 'play'}/>
          </Action>

          <type.label className="label" style={{marginLeft: 8}}>{label}</type.label>
        </Content>
      </div>
    )
  }
}

export default MorseCodePreview
