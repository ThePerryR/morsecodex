import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'

import { colors, type } from '../../../utils/style'
import Icon from '../../static/Icon'
import Align from '../../layout/Align'

const Lesson = styled.div`
  position: relative;
  height: 72px;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 6px;
  box-sizing: border-box;
  color: ${colors.black};
  
  .text {
    transition: color 120ms linear;
    color: ${colors.black};
  }
  
  .category {
    color: ${colors.grey};
  }
  
  .icon-white {
    display: none;
  }
  
  &:hover {
    transition: box-shadow 150ms linear, background 0s linear 0ms;
    background: ${colors.primary};
    color: white;
    z-index: 1;
    background: linear-gradient(to bottom, #4d99f5 0%,#4894ee 100%);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    .category {
      color: white;
    }
    .icon-white {
      display: inline-flex;
    }
    .icon-grey {
      display: none;
    }
  }
`

const AccountImage = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  background-image: url("${props => props.image}");
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  margin-right: 22px;
`

export default ({lesson, style, className, gold, position}) => {
  const report = lesson.report
  return (
    <Link to={`/lesson/${lesson.id}`} style={{textDecoration: 'none', width: '100%'}}>
      <Lesson style={style} className={className}>
        <type.heading className="category" style={{marginRight: 24}}>
          <b>{position}</b>
        </type.heading>
        <AccountImage image={lesson.user.image}/>
        <div style={{flex: 1}}>
          <type.heading style={{marginBottom: 5, marginTop: -2}}>
            <b>{lesson.name || 'Unnamed'}</b>
          </type.heading>
          <type.subheading className="category">{lesson.category || 'No Category'}</type.subheading>
        </div>

        <type.subheading style={{marginLeft: 24}} className="category">
          <b>
            {(report && lesson.blocks.length > 1)
              ? `${Math.floor((report.currentIndex || 0) / (lesson.blocks.length - 1) * 100)}%`
              : 'Not Started'
            }
          </b>
        </type.subheading>
        <Align>
          <type.subheading
            className="category"
            style={{width: 28, textAlign: 'right', marginRight: 6}}
            color={colors.grey}>
            <b>{lesson.stars}</b>
          </type.subheading>
          <Icon
            className="icon-white"
            color="white"
            style={{marginTop: -2}}
            icon={'star'}
            size="small"
          />
          <Icon
            className="icon-grey"
            style={{marginTop: -2}}
            icon={'star'}
            size="small"
          />
        </Align>
        <Align style={{marginLeft: 24}}>
          <type.subheading
            className="category"
            style={{width: 28, textAlign: 'right', marginRight: 6}}
            color={colors.grey}>
            <b>{lesson.students}</b>
          </type.subheading>
          <Icon
            className="icon-white"
            color="white"
            style={{marginTop: -2}}
            icon="user"
            size="small"
          />
          <Icon
            className="icon-grey"
            style={{marginTop: -2}}
            icon="user"
            size="small"
          />
        </Align>
      </Lesson>
    </Link>
  )
}
