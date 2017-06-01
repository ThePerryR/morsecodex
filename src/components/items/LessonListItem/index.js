import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import moment from 'moment'
import { Link } from 'react-router'
import styled from 'styled-components'

import { colors, type } from '../../../utils/style'

import AccountImage from '../../content/AccountImage'
import AccountLessonLinks from '../../content/AccountLessonLinks'
import StatsBar from '../../content/StatsBar'
import Align from '../../layout/Align'
import Button from '../../static/Button'
import Icon from '../../static/Icon'

const Wrapper = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const AdminBar = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
`

const LessonListItem = ({lesson, style, className, message}) => {
  const account = lesson.store.store.currentUser
  const starIndex = account ? account.stars.findIndex(id => id === lesson.id) : -1
  return (
    <div style={style} className={className}>
      <Wrapper>
        <Align>
          <AccountImage style={{marginRight: 8}} account={lesson.account}/>
          <div>
            <AccountLessonLinks
              account={lesson.account}
              lesson={lesson}
              message={Number.isInteger(message) ? lesson.messages[message] : null}
            />
            <type.note color={colors.grey}>Updated {moment(lesson.updatedAt).fromNow()}</type.note>
          </div>
        </Align>
        <div>
          {!Number.isInteger(message) &&
          <StatsBar
            stats={[
              {
                label: <Icon icon={starIndex >= 0 ? 'starFill' : 'star'} size="x-small"/>,
                count: lesson.stars || 0,
                handleClick: account ? () => {
                  if (starIndex >= 0) {
                    lesson.stars -= 1
                    account.stars.splice(starIndex, 1)
                  } else {
                    lesson.stars += 1
                    account.stars.push(lesson.id)
                  }
                  lesson.store.store.TransportLayer.toggleStar(lesson.id)
                } : null
              },
              {label: 'students', count: lesson.students || 0}
            ]}
          />
          }
        </div>

      </Wrapper>
      {lesson.canEdit && !message &&
      <AdminBar>
        <Link style={{textDecoration: 'none'}} to={`/lesson/${lesson.id}/edit`}>
          <Button flat small label="Edit"/>
        </Link>
      </AdminBar>
      }
    </div>
  )
}

LessonListItem.propTypes = {
  lesson: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string
  }).isRequired
}

export default observer(LessonListItem)
