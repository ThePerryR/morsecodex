import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import categories from '../../../constants/categories'
import { colors, type } from '../../../utils/style'

const Content = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  height: 104px;
  border-bottom: 1px solid ${colors.border};
`

const SectionWrapper = styled.div`
  position: relative;
  width: 336px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.disabled ? 0.2 : 1};
  cursor: pointer;
  &:after {
  content: '';
    position: absolute;
    top: 10px;
    right: 0;
    bottom: 10px;
    width: 1px;
    background-image: linear-gradient(to bottom, #b2b2b2, #b2b2b2 1px, transparent 1px, transparent 2px);
    background-repeat: repeat-y;
    background-position: right top;
    background-size: 1px 3px;
  }
  &:last-child {
   &:after {
     display: none;
   }
  }
`

const Section = ({label, value, disabled, selected, onClick}) =>
  <SectionWrapper disabled={disabled} onClick={onClick}>
    <div>
      <type.label color={selected ? colors.primary : colors.black}>{label}</type.label>
      <type.label color={colors.grey}>{value}</type.label>
    </div>
  </SectionWrapper>

@observer
class EditLessonOverview extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tempName: null
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
  }

  setRef = (ref) => {
    if (!this.ref) {
      this.ref = ref
    }
  }

  get name () {
    return this.state.tempName === null ? this.props.lesson.name : (this.state.tempName || '')
  }

  get access () {
    if (!this.props.lesson.active) {
      return 'nobody'
    }
    if (this.props.lesson.private) {
      return 'url'
    }
    return 'everyone'
  }

  get type () {
    return this.props.lesson.type
  }

  get category () {
    const {category, subcategory} = this.props.lesson
    if (!category) {
      return 'Please choose a category'
    }
    const {name, subs} = categories.find(c => c.value === category)
    if (!subcategory) {
      return name
    }
    return subs.find(s => s.value === subcategory).name
  }

  render () {
    const {selected, lesson, changeSection} = this.props
    return (
      <Content innerRef={this.setRef}>
        <Section
          label="What are you teaching?"
          value={lesson.name || 'Unnamed'}
          selected={selected === 'name'}
          onClick={() => changeSection('name')}
        />
        <Section
          label="Who can access this page?"
          value={lesson.active ? lesson.private ? 'Anyone with the URL' : 'Anyone' : 'Only you'}
          selected={selected === 'access'}
          disabled={!lesson.name}
          onClick={() => changeSection('access')}
        />
        <Section
          label="How would you categorize this?"
          value={this.category}
          selected={selected === 'category'}
          disabled={!lesson.name}
          onClick={() => changeSection('category')}
        />
      </Content>
    )
  }
}

EditLessonOverview.propTypes = {
  lesson: PropTypes.object.isRequired
}

export default EditLessonOverview
