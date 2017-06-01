import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { type, colors } from '../../../utils/style'
import Options, {Extra} from '../Options'

const Wrapper = styled.div`
  width: 100%;
`

const Size = styled.div`
  width: 100%;
  margin-bottom: 8px;
  cursor: pointer;
  padding: 2px;
  > div {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  
  ${props => props.selected && `
    outline: 1px solid ${colors.primary};
  `}
`

const Label = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.grey};
`

const SectionTitle = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${colors.divider}
  text-transform: uppercase;
  color: ${colors.grey};
  font-size: 12px;
`

const Section = styled.div`
  border-bottom: 1px solid ${colors.border};
  padding: 16px;
  box-sizing: border-box;
`

const Option = styled(type.label)`
  cursor: pointer;
  padding-left: 8px;
  padding-right: 8px;
  ${props => props.selected && `
    outline: 1px solid ${colors.primary};
  `}
`

@observer
class TextOptions extends Options {
  update = (key, value) => {
    this.props.block[key] = value
    this.props.block.lesson.save()
  }

  render () {
    const {block, close} = this.props
    const {value = 'type something...'} = block
    return (
      <Wrapper innerRef={this.setRef}>
        <SectionTitle>Choose a font size:</SectionTitle>
        <Section>
          <Label>Title</Label>
          <Size
            onClick={this.update.bind(null, 'size', 'title')}
            selected={block.size === 'title'}>
            <type.title style={{lineHeight: '36px'}}>{value}</type.title>
          </Size>
          <Label>Subtitle</Label>
          <Size
            onClick={this.update.bind(null, 'size', 'subtitle')}
            selected={block.size === 'subtitle'}>
            <type.subtitle style={{lineHeight: '24px'}}>{value}</type.subtitle>
          </Size>
          <Label>Heading</Label>
          <Size
            onClick={this.update.bind(null, 'size', 'heading')}
            selected={block.size === 'heading'}>
            <type.heading style={{lineHeight: '18px'}}>{value}</type.heading>
          </Size>
          <Label>Subheading</Label>
          <Size
            onClick={this.update.bind(null, 'size', 'subheading')}
            selected={block.size === 'subheading'}>
            <type.subheading style={{lineHeight: '16px'}}>{value}</type.subheading>
          </Size>
          <Label>Body</Label>
          <Size
            onClick={this.update.bind(null, 'size', 'label')}
            selected={block.size === 'label'}>
            <type.label style={{lineHeight: '14px'}}>{value}</type.label>
          </Size>
          <Label>Note</Label>
          <Size
            onClick={this.update.bind(null, 'size', 'note')}
            selected={block.size === 'note'}>
            <type.note style={{lineHeight: '12px'}}>{value}</type.note>
          </Size>
        </Section>
        <SectionTitle>Choose an alignment:</SectionTitle>
        <Section>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Option
              onClick={this.update.bind(null, 'align', 'left')}
              selected={block.align === 'left'}>
              Left
            </Option>
            <Option
              onClick={this.update.bind(null, 'align', 'center')}
              selected={block.align === 'center'}>
              Center
            </Option>
            <Option
              onClick={this.update.bind(null, 'align', 'right')}
              selected={block.align === 'right'}>
              Right
            </Option>
          </div>
        </Section>
        <SectionTitle>Choose a weight:</SectionTitle>
        <Section>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Option
              onClick={this.update.bind(null, 'weight', 300)}
              style={{fontWeight: 300}}
              selected={block.weight === 300}>
              Aa
            </Option>
            <Option
              onClick={this.update.bind(null, 'weight', 400)}
              style={{fontWeight: 400}}
              selected={block.weight === 400}>
              Aa
            </Option>
            <Option
              onClick={this.update.bind(null, 'weight', 600)}
              style={{fontWeight: 600}}
              selected={block.weight === 600}>
              Aa
            </Option>
          </div>
        </Section>
        <SectionTitle>Toggle Margin:</SectionTitle>
        <Section>
          <Option
            onClick={this.update.bind(null, 'margin', !block.margin)}
            selected={block.margin}>
            Margin
          </Option>
        </Section>
        <Extra block={block} close={close} />
      </Wrapper>
    )
  }
}

export default TextOptions
