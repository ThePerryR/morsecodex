import React from 'react'

import Lesson from '../../items/Lesson'

const LessonList = ({lessons}) => {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        borderRadius: 4
      }}>
      {lessons.map((lesson, i) =>
        <div key={lesson.id} style={{display: 'flex', alignItems: 'center'}}>
          <Lesson
            position={i + 1}
            lesson={lesson}
            gold={!i}
          />
        </div>
      )}
    </div>
  )
}

export default LessonList
