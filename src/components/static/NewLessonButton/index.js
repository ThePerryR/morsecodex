import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'

import { colors } from '../../../utils/style'

/**
 * NewLessonButton
 * Displays "+ New Lesson". When clicked a new lesson is created and the
 * user is redirected to edit it
 */
const NewLessonButton = ({store: {TransportLayer, LessonStore}, style, className}) =>
  <div
    onClick={() => {
      TransportLayer.createLesson().then(({lesson}) => {
        LessonStore.updateItemFromServer(lesson)
        browserHistory.push(`/lesson/${lesson._id}/edit`)
      })
    }}
    style={{
      ...style,
      cursor: 'pointer',
      border: `1px solid ${colors.border}`,
      borderRadius: 2,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 16,
      paddingRight: 16,
      textTransform: 'uppercase',
      color: '#868686',
      fontWeight: 600,
      fontSize: 10
    }}
    className={className}>+ New Lesson
  </div>

NewLessonButton.propTypes = {
  store: PropTypes.shape({
    TransportLayer: PropTypes.shape({
      createLesson: PropTypes.func.isRequired
    }).isRequired,
    LessonStore: PropTypes.shape({
      updateItemFromServer: PropTypes.func.isRequired
    }).isRequired
  }).isRequired
}

export default NewLessonButton
