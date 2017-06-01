import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import moment from 'moment'
import styled from 'styled-components'

import { colors, type } from '../../../utils/style'
import blocks from '../../blocks'
import Input from '../../dom/Input'
import FormLabel from '../../static/FormLabel'
import BlockChoices from '../BlockChoices'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
`

const Content = styled.div`
  flex: 1;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  box-sizing: border-box;
  border-bottom: 1px solid ${colors.divider};
`

const TopRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Time = styled(type.note)`
  color: ${colors.grey};
`

const Blocks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 16px;
  box-sizing: border-box;
`

const MessageOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 320px;
  border-left: 1px solid ${colors.border};
  flex-shrink: 0;
`

class MessageEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openBlock: null
    }
  }

  render () {
    const {message, handleDelete} = this.props
    if (!message) {
      return <div/>
    }

    const openBlock = this.state.openBlock !== null && message.blocks[this.state.openBlock]
    const OptionEditor = openBlock && blocks[openBlock.type].OptionEditor
    return (
      <Wrapper>
        <Content>
          <Top>
            <div style={{width: 320}}>
              <FormLabel>Page Name</FormLabel>
              <Input
                value={message.name || ''}
                onChange={message.handleChange} name="name"
              />
            </div>
            <TopRight>
              <div onClick={handleDelete}>Delete</div>
              {message.saving && <Time>Saving...</Time>}
              {!message.saving && <Time>Saved {moment(message.updatedAt).fromNow()}</Time>}
            </TopRight>
          </Top>
          <Blocks>
            {message.blocks.map((block, i) => {
              const {Editor} = blocks[block.type]
              return (
                <div key={i} onClick={() => this.setState({openBlock: i})}>
                  <Editor
                    block={block}
                  />
                </div>
              )
            })}
          </Blocks>
          <BlockChoices
            handleSelect={message.addBlock}
          />
        </Content>
        <MessageOptions>
          {OptionEditor &&
          <OptionEditor
            block={openBlock}
          />
          }
        </MessageOptions>
      </Wrapper>
    )
  }
}

MessageEditor.propTypes = {
  message: PropTypes.shape({}),
  handleDelete: PropTypes.func.isRequired
}
MessageEditor.defaultProps = {
  message: null
}

export default observer(MessageEditor)
