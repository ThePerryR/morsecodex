import React from 'react'

import { colors } from '../../../utils/style'

import Preview from '../Preview'
import Lesson from '../../items/Lesson'

class LessonPointerPreview extends Preview {
  get lesson () {
    const {lessonId, lesson} = this.props.block
    if (lessonId && !this._lesson) {
      const AppStore = lesson.store.store
      this._lesson = AppStore.LessonStore.get(lessonId)
      return this._lesson
    }
    return this._lesson
  }

  render () {
    if (!this.lesson) {
      return <div />
    }
    return (
      <Lesson
        style={{
          border: `1px solid ${colors.border}`,
          marginBottom: 24,
          padding: 16,
          boxSizing: 'border-box'
        }}
        lesson={this.lesson}
      />
    )
  }
}

export default LessonPointerPreview
