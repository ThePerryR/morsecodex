import React, { Component } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { colors, type } from '../../../utils/style'
import DeleteManager from '../../static/DeleteManager'
import TextEditor from '../../blocks/text/editor'

const Outer = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
  justify-content: center;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1;
  max-width: 800px;
  padding-left: 24px;
  padding-right: 24px;
  margin-bottom: 56px;
`

const Admin = styled.div`
  padding: 16px;
  box-sizing: border-box;
  background: ${colors.background};
  margin-top: 16px;
  border-radius: 6px;
`

@observer
class PageEditor extends Component {
  blockRefs = []

  constructor (props) {
    super(props)
    this.state = {
      selectedBlock: null,
      top: 0
    }
  }

  setBlock = (selectedBlock, i) => {
    if (this.state.selectedBlock !== selectedBlock) {
      this.setState({selectedBlock, selectedIndex: i, top: this.blockRefs[i].offsetTop})
    }
  }

  closeBlock = () => {
    this.setState({selectedBlock: null, selectedIndex: null, top: 0})
  }

  delete = () => {
    this.props.lesson.store.store.TransportLayer.delete('lesson', this.state.lesson.id)
    this.props.router.push(`/account/${this.props.page.store.store.currentUserId}`)
  }

  render () {
    const {lesson} = this.props
    const {selectedBlock} = this.state
    return (
      <Outer>
        <Wrapper>
          <TextEditor lesson={lesson}/>
          <Admin>
            <DeleteManager delete={this.delete}>
              <type.note color={colors.danger} style={{cursor: 'pointer'}}>Delete</type.note>
            </DeleteManager>
          </Admin>
        </Wrapper>
      </Outer>
    )
  }
}

export default PageEditor
