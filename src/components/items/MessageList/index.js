import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'

import { colors, type } from '../../../utils/style'

const Wrapper = styled.div`
  border: 1px solid ${colors.border};
  border-radius: 4px;
  margin-bottom: 24px;
  
  .message {
    border-bottom: 1px solid ${colors.border};
  }
  a:last-child .message {
    border-bottom: none;
  }
`

const Message = styled(type.label)`
  height: 32px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  color: ${colors.link};
`

const MessageList = ({messages}) => {
  const sections = []
  messages.forEach((message, i) => {
    if (message.questionType === 'lesson') {
      const subLesson = message.store.store.LessonStore.get(message.questionMeta.get('lesson'))
      const subLessonMessages = subLesson.messages
      sections.push({label: subLesson.name, messages: subLessonMessages})
      if (messages[i + 1] && messages[i + 1].questionType !== 'lesson') {
        sections.push({messages: []})
      }
    } else {
      if (!sections.length) {
        sections.push({messages: []})
      }
      sections[sections.length - 1].messages.push(message)
    }
  })

  return (
    <div>
      {sections.map((section, i) =>
        <div key={i}>
          {section.label &&
          <type.subheading style={{marginBottom: 8}}>{section.label}</type.subheading>
          }
          <Wrapper>
            {section.messages.map(message =>
              <Link
                key={message.id}
                to={`/lesson/${message.lesson.id}/${message.order + 1}`}
                style={{textDecoration: 'none'}}>
                <Message className="message">
                  {message.order + 1} - {message.name || 'Unnamed'}
                </Message>
              </Link>
            )}
          </Wrapper>
        </div>
      )}
    </div>
  )
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({})).isRequired
}

export default MessageList
