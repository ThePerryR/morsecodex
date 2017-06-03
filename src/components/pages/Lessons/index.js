import React from 'react'
import Page from '../'

class Lessons extends Page {
  render() {
    return (
      <div>
        <div>Lesson</div>
        <div>Chapters</div>
      </div>
    )
  }
}

Lessons.request = 'lessons'

export default Lessons
