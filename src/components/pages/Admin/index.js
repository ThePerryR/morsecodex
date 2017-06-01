import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lesson: null
    }
  }

  componentDidMount () {
    this.props.store.TransportLayer.fetchLessons().then(({lessons}) => {
      this.props.store.LessonStore.updateItems(lessons)
    })
  }

  newTrack = () => {
    this.props.store.TransportLayer.createLesson().then(({lesson}) => {
      this.props.store.LessonStore.updateItemFromServer(lesson)
    })
  }

  deleteLesson = (id) => {
    if (this.state.lesson && this.state.lesson.id === id) {
      this.setState({lesson: null})
    }
    this.props.store.TransportLayer.delete('lesson', id)
    this.props.store.LessonStore.removeItem(id)
  }

  render () {
    const {lesson} = this.state
    return (
      <div>
        <div onClick={this.newTrack}>New Track</div>
        {this.props.store.LessonStore.items.map((lesson) => {
          return (
            <div key={lesson.id}>
              <div onClick={() => this.setState({lesson})}>
                {lesson.name || 'Unnamed'}
              </div>
              <div onClick={this.deleteLesson.bind(null, lesson.id)}>Delete</div>
            </div>
          )
        })}
        {lesson &&
        <div>
          <div>
            <input
              value={lesson.name || ''}
              onChange={e => {
                lesson.name = e.target.value
                lesson.save()
              }}
            />
            {lesson.blocks.map(((block, i) => {
              return (
                <div key={i} style={{marginTop: 24, marginBottom: 24}}>
                  <div>
                    <span>Block {i}&nbsp;</span>
                    <span
                      onClick={() => {
                        lesson.blocks.splice(i, 1)
                        lesson.save()
                      }}>D</span>
                  </div>
                  <div>Type:</div>
                  <select
                    value={lesson.type}
                    onChange={(e) => {
                      lesson.type = e.target.value
                      lesson.save()
                    }}>
                    <option value="">Select</option>
                    <option value="message">Message</option>
                    <option value="math">Math</option>
                  </select>
                  {Object.keys(lesson.meta.toJS()).map((m, i) => {
                    return (
                      <div key={i}>
                        <div>{m}:</div>
                        <input
                          value={lesson.meta.get(m)}
                          onChange={(e) => {
                            lesson.meta.set(m, e.target.value)
                            lesson.save()
                          }}
                        />
                        <div
                          onClick={() => {
                            lesson.meta.delete(m)
                            lesson.save()
                          }}>
                          Delete
                        </div>
                      </div>
                    )
                  })}
                  <div>
                    <input
                      placeholder="add key"
                      value={this.state.tempKey || ''}
                      onChange={e => this.setState({tempKey: e.target.value})}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && this.state.tempKey && !lesson.meta.get(this.state.tempKey)) {
                          lesson.meta.set(this.state.tempKey, '')
                          lesson.save()
                          this.setState({tempKey: ''})
                        }
                      }}
                    />
                  </div>
                </div>
              )
            }))}
            <div
              onClick={() => {
                lesson.addBlock()
              }}>
              Add Block
            </div>
          </div>
        </div>
        }
      </div>
    )
  }
}

export default Admin
