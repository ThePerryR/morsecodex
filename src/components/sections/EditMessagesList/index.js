import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { colors } from '../../../utils/style'

import EditMessageListItem from '../../items/EditMessageListItem'
import Button from '../../static/Button'
import FormLabel from '../../static/FormLabel'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: 280px;
  padding: 8px;
  box-sizing: border-box;
  
  background: ${colors.section};
  border-right: 1px solid ${colors.border};
`

@observer
class EditMessageList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      draggingIndex: null
    }
  }

  startOrderTimer = () => {
    clearTimeout(this.orderTimer)
    this.orderTimer = setTimeout(this.updateMessages, 2000)
  }

  updateMessages = () => this.props.lesson.messages.forEach((message) => {
    this.props.lesson.store.store.TransportLayer.updateMessage(message)
  })

  handleOrder = ({draggingIndex, items}) => {
    if (items) {
      items.forEach((item, i) => {
        item.order = i
      })
    }
    if (draggingIndex === null && !items) {
      this.startOrderTimer()
    }
    this.setState({draggingIndex})
  }

  render () {
    const {lesson, selectedIndex, handleSelect} = this.props
    const {TransportLayer, MessageStore} = lesson.store.store
    const messages = lesson.messages
    return (
      <Wrapper>
        <FormLabel>Messages</FormLabel>
        <div>
          {messages.map((message, i) =>
            <EditMessageListItem
              key={message.id}
              updateState={this.handleOrder}
              items={messages}
              draggingIndex={this.state.draggingIndex}
              sortId={i}
              outline="list"
              childProps={{
                message,
                selected: selectedIndex === i,
                handleClick: () => handleSelect(i)
              }}
            />
          )}
        </div>
        <Button
          small
          label="Add Message"
          handleClick={() => TransportLayer.createMessage({
            lesson: lesson.id,
            order: messages.length
          })
            .then(({message}) => {
              MessageStore.updateItemFromServer(message)
              this.props.handleSelect(message.order)
            })}
        />
      </Wrapper>
    )
  }
}

EditMessageList.propTypes = {
  lesson: PropTypes.shape({}).isRequired,
  selectedIndex: PropTypes.number,
  handleSelect: PropTypes.func
}
EditMessageList.defaultProps = {
  selectedIndex: null,
  handleSelect: () => {}
}

export default EditMessageList
