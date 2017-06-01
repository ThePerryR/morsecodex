import React, { Component } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import MessageEditor from '../MessageEditor'
import SectionList from '../SectionList'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
  margin-left: 24px;
  margin-right: 24px;
  background-repeat: repeat-x;
  background-position: left top;
  background-size: 4px 1px;
`

class LessonSectionsEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openSection: null,
      openMessage: null
    }
  }

  _toggle = (key) => (id) => {
    const alreadyOpen = this.state[key] === id

    if (alreadyOpen) {
      this.setState({[key]: null})
    } else {
      this.setState({[key]: id})
    }
  }

  toggleSection = this._toggle('openSection')
  toggleMessage = this._toggle('openMessage')

  render () {
    const {lesson} = this.props
    const {MessageStore} = lesson.store.store
    const {openMessage} = this.state
    const message = openMessage && MessageStore.get(openMessage)

    return (
      <Wrapper>
        <SectionList
          lesson={lesson}
          toggleSection={this.toggleSection}
          toggleMessage={this.toggleMessage}
          {...this.state}
        />
        <MessageEditor
          message={message}
          handleDelete={() => {
            if (openMessage) {
              this.setState({openMessage: null})
              lesson.removeMessage(openMessage)
            }
          }}
        />
      </Wrapper>
    )
  }
}

export default observer(LessonSectionsEditor)
