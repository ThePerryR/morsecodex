import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

import categories from '../../../constants/categories'
import { colors, type } from '../../../utils/style'
import Icon from '../../static/Icon'

const Wrapper = styled.div`
  padding: 4px 10px 4px 10px;
  box-sizing: border-box;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  width: 168px;
  border-radius: 12px;
  border: 4px solid ${props => props.color};
  cursor: pointer;
  transition: box-shadow 200ms ease-in;
  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.32);
  }
  &:active {
    box-shadow: none;
  }
  color: ${colors.black};
  ${props => props.complete && `
    color: white;
    background: ${colors.positiveBack};
    border-color: ${colors.positiveBack};
  `}
`

const Name = styled(type.label)`
  font-weight: 600;
  height: 56px;
`

const Percent = styled.div`
  height: 92px;
  font-size: 68px;
  font-weight: 400;
  line-height: 92px;
  color: ${colors.lightGrey};
  text-align: left;
  ${props => props.complete && `
    color: white;
  `}
`

const Category = styled(type.label)`
  display: flex;
  align-items: center;
  font-weight: 600;
`

const defaultCategory = {
  color: colors.border,
  name: 'No Category',
  icon: 'error'
}

export default ({report}) => {
  const {lesson} = report
  const category = lesson.category ? (categories.find(c => c.value === lesson.category) || defaultCategory) : defaultCategory
  const percent = lesson.blocks.length > 1 ? Math.floor((report.currentIndex / (lesson.blocks.length - 1)) * 100) : 100
  return (
    <Link to={`/lesson/${report._lesson}`} style={{textDecoration: 'none'}}>
      <Wrapper color={category && category.color} complete={percent >= 100}>
        <Name>{lesson.name}</Name>
        <Percent complete={percent >= 100}>
          {percent}
          <span style={{fontSize: 16}}>%</span>
        </Percent>
        <Category>
          <Icon
            style={{marginRight: 6}}
            size="x-small"
            icon={category.icon}
            color={percent >= 100 ? 'white' : 'black'}
          />
          &nbsp;{category.name}
        </Category>
      </Wrapper>
    </Link>
  )
}
