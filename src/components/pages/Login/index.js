import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import styled from 'styled-components'

import { colors, type } from '../../../utils/style'
import Input from '../../dom/Input'
import TextButton from '../../static/TextButton'
import PageStatus from './PageStatus'

const Wrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      submitting: false,
      sent: false
    }
  }

  update = e => !this.state.submitting && this.setState({email: e.target.value})
  keyPress = e => e.key === 'Enter' && this.submit()
  submit = () => {
    const {email, submitting} = this.state
    if (!email || submitting) {
      return
    }
    this.setState({submitting: true})
    this.props.store.TransportLayer.login(email).then(this.handleSuccess).catch(this.handleError)
  }
  handleSuccess = () => this.setState({submitting: false, sent: true})
  handleError = (e) => console.log(e)
  setInputRef = input => {
    if (!this.input) {
      this.input = input
      this.input.focus()
    }
  }

  render () {
    const {email, submitting, sent} = this.state

    return (
      <DocumentTitle title="Login | TeachOK">
        <Wrapper>
          <PageStatus submitting={submitting} sent={sent} email={email}/>
          <type.heading color={colors.grey} style={{marginBottom: 10}}>
            Join / Login
          </type.heading>
          <type.label style={{marginBottom: 32}}>
            We just use email. No password required!
          </type.label>
          <Input
            style={{maxWidth: 280, marginBottom: 10}}
            placeholder="Enter your email address to continue"
            value={email}
            onChange={this.update}
            onKeyPress={this.keyPress}
            innerRef={this.setInputRef}
            disabled={submitting || sent}
          />
          <TextButton disabled={!email || submitting || sent} onClick={this.submit}>
            Send me an email to finish joining or logging in
          </TextButton>
        </Wrapper>
      </DocumentTitle>
    )
  }
}

export default Login
