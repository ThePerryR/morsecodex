import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'

import Panel from '../../static/Panel'
import EditMessagesList from '../EditMessagesList'
import MessageEditor from '../MessageEditor'

const Row = styled.div`
  display: flex;
`

const StyledMessageEditor = styled(MessageEditor)`
  flex: 1;
`

class EditLessonMessages extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  selectMessage = (selected) => {
    this.setState({selected: null}, () => this.setState({selected}))
  }

  render () {
    return (
      <Panel title="Messages">
        <Row>
          <EditMessagesList
            lesson={this.props.lesson}
            selectedIndex={this.state.selected}
            handleSelect={this.selectMessage}
          />
          <StyledMessageEditor
            delete={() => this.setState({selected: null})}
            message={this.props.lesson.messages[this.state.selected]}
          />
        </Row>
      </Panel>
    )
  }
}

EditLessonMessages.propTypes = {
  lesson: PropTypes.object.isRequired
}

export default EditLessonMessages
