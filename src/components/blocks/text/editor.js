import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import {
  Editor as DraftEditor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  Modifier,
  CompositeDecorator
} from 'draft-js'

import { sizes, margins, colors, type } from '../../../utils/style'
import Editor, { StyledIcon, OptionSection } from '../Editor'
import Button from '../../static/Button'
import LinkInput from './LinkInput'
import QuestionInput from './QuestionInput'
import AtomicComponent from './QuestionComponent'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  ${props => sizes[props.size || 'label']}
  ${props => props.margin && margins[props.size]}
  
  .DraftEditor-root {
    position: relative;
    .public-DraftEditorPlaceholder-root {
      position: absolute;
      color: ${colors.grey}
    }
  }
`

const ExtraInput = styled.div`
  border: 1px solid ${colors.border};
  background: white;
  padding: 16px;
  border-radius: 4px;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 40px;
`

function findLinkEntities (contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      )
    },
    callback
  )
}

function blockRendererFn(contentBlock) {
  const type = contentBlock.getType();
  console.log(contentBlock.getDepth())
  if (type === 'atomic') {
    return {
      component: AtomicComponent,
      editable: false,
      props: {
        foo: 'bar',
      },
    };
  }
}

const Link = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData()
  return (
    <a
      href={url}
      style={{
        color: '#3b5998',
        textDecoration: 'underline'
      }}>
      {props.children}
    </a>
  )
}

class TextEditor extends Editor {
  constructor (props) {
    super(props)
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ])
    this.state = {
      editorState: props.lesson.value
        ? EditorState.createWithContent(convertFromRaw(props.lesson.value), decorator)
        : EditorState.createEmpty(decorator)
    }
  }

  onChange = (editorState) => {
    const raw = convertToRaw(editorState.getCurrentContent())
    this.setState({editorState})
    this.props.lesson.value = raw
    this.props.lesson.save()
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  render () {
    const {setSelectedTo, readOnly} = this.props
    const inlineStyles = this.state.editorState.getCurrentInlineStyle()
    const selectionState = this.state.editorState.getSelection()
    const anchorKey = selectionState.getAnchorKey()
    const currentContent = this.state.editorState.getCurrentContent()
    const currentContentBlock = currentContent.getBlockForKey(anchorKey)
    const start = selectionState.getStartOffset()
    const end = selectionState.getEndOffset()
    const selectedText = currentContentBlock.getText().slice(start, end)
    const containsLink = RichUtils.currentBlockContainsLink(this.state.editorState)
    return (
      <Wrapper>
        <div style={{display: 'flex', marginBottom: 24}}>
          <OptionSection>
            <StyledIcon
              icon="link"
              selected={containsLink}
              onClick={() => {
                if (containsLink) {
                  return this.onChange(RichUtils.toggleLink(this.state.editorState, selectionState, null))
                }
                this.input.focus()
                this.setState({extraInput: 'link'})
              }}
            />
          </OptionSection>
          <OptionSection>
            <StyledIcon
              icon="bold"
              onClick={() => this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))}
            />
            <StyledIcon
              icon="italics"
              onClick={() => this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALICS'))}
            />
          </OptionSection>
          <OptionSection>
            <StyledIcon
              icon="question"
              onClick={() => {
                this.input.focus()
                this.setState({extraInput: 'question'})
              }}
            />
          </OptionSection>
        </div>
        {this.state.extraInput === 'link' &&
        <LinkInput
          editorState={this.state.editorState}
          handleClose={() => this.setState({extraInput: null})}
          handleApply={this.onChange}
        />
        }
        {this.state.extraInput === 'question' &&
        <QuestionInput
          editorState={this.state.editorState}
          handleClose={() => this.setState({extraInput: null})}
          handleApply={this.onChange}
        />
        }
        <DraftEditor
          ref={(ref) => {
            if (!this.input && ref) {
              this.input = ref
              this.input.focus()
            }
          }}
          readOnly={readOnly}
          spellCheck={true}
          placeholder="Write you lesson here..."
          editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          blockRendererFn={blockRendererFn}
        />
      </Wrapper>
    )
  }
}

export default observer(TextEditor)
