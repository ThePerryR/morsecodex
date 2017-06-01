import React from 'react'
import { observer } from 'mobx-react'

import Editor from '../Editor'

@observer
export default class extends Editor {
  constructor (props) {
    super(props)
    this.state = {
      lessons: null
    }
  }

  componentDidMount () {
    const appStore = this.props.block.lesson.store.store
    const transportLayer = appStore.TransportLayer
    transportLayer.fetchLessons().then(({lessons}) => {
      this.setState({lessons})
    })
  }

  setLesson = e => {
    this.props.block.lessonId = e.target.value
    this.props.block.lesson.save()
  }

  render () {
    return (
      <div style={{marginBottom: 24}}>
        <div style={{width: '100%', height: 64, border: '1px solid grey', borderRadius: 4}}/>
        <div>
          {(this.state.lessons && this.props.selected) &&
          <select value={this.props.block.lessonId} onChange={this.setLesson}>
            {this.state.lessons.map(lesson =>
              <option
                key={lesson._id}
                value={lesson._id}>
                {lesson.name}
              </option>
            )}
          </select>
          }
        </div>
      </div>
    )
  }
}
