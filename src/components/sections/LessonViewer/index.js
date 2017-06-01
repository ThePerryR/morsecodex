import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'
import { Link, browserHistory } from 'react-router'
import Waypoint from 'react-waypoint'
import { animateScroll } from 'react-scroll'
import { observer } from 'mobx-react'

import { colors, type } from '../../../utils/style'
import Preview from '../../blocks/text/editor'
import Logo from '../../static/Logo'
import DeleteManager from '../../static/DeleteManager'
import Icon from '../../static/Icon'

const Wrapper = styled.div`
  position: relative;
  max-width: 720px;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  ${props => props.fixed && `
    padding-top: 70px;
  `}
`

const Footer = styled.div`
  padding: 14px 0;
  border-top: 3px solid #e6e6e6;
  margin-top: 42px;
`

const ProPic = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-image: url("${props => props.src}");
  background-size: cover;
  background-position: center;
  border: 2px solid #d9d9d9;
  box-sizing: border-box;
`

const Star = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 72px;
  height: 32px;
  cursor: pointer;
  padding-left: 8px;
  padding-right: 8px;
  box-sizing: border-box;
  
  font-weight: 500;
  border: 1px solid ${colors.border};
  border-radius: 2px;
`

const ProgressWrapper = styled.div`
  position: relative;
  background: white;
  padding-top: 40px;
  padding-bottom: 16px;
  box-sizing: border-box;
  z-index: 2;
  width: 100%;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  ${props => props.fixed && `
    position: fixed;
    top: 0;
    max-width: 688px;
    padding-bottom: 0;
    padding-left: 16px;
    padding-right: 16px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.18);
    > div {
      opacity: 0.32;
      transition: opacity 150ms linear;
    }
    &:hover {
      > div {
        opacity: 1;
      }
    }
    .progress-name {
      margin-left: 16px;
    }
  `}
  ${props => props.complete && `
    > div {
      opacity: 1;
    }
  `}
`

const ProgressName = styled(type.note)`
  position: absolute;
  top: 12px;
  left: 0;
  color: ${colors.black};
  font-weight: 600;
`

const Progress = styled.div`
  height: 8px;
  border-radius: 4px;
  background: ${colors.background};
  overflow: hidden;
  margin-bottom: 16px;
  box-sizing: border-box;
  position: relative;
  width: 100%;
`

const Fill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: ${colors.primary};
  transition: all 150ms linear;
  width: 0;
  ${props => props.complete && `
    background: ${colors.positiveBack};
  `}
`

const ProgressLogo = styled(Logo)`
  position: absolute;
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
`

const PreviewWrapper = styled.div`
  position: relative;
  .preview: {
    opacity: 1;
    transition: opacity 200ms linear;
  }
  .edit {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &:hover {
    .edit {
      display: inline-block;
    }
    .preview {
      opacity: 0.2;
    }
  }
`

@observer
class LessonViewer extends Component {
  blocks = []

  constructor (props) {
    super(props)
    this.state = {
      editingIndex: null
    }
  }

  next = (index) => {
    if (this.state.lesson.blocks[index].blocking && index >= this.report.currentIndex) {
      this.report.currentIndex = index + 1
      this.update()
    }
  }

  update = () => {
    this.props.store.TransportLayer.updateReport(this.report)
    animateScroll.scrollToBottom()
  }

  star = () => {
    if (!this.props.store.currentUser) {
      return browserHistory.push('/login')
    }

    this.props.store.currentUser.toggleStar(this.props.lesson.id)
  }

  clickBlock = (editingIndex) => {
    if (this.props.admin) {
      this.setState({editingIndex})
    }
  }

  get hasStarred () {
    if (!this.props.store.currentUser) {
      return false
    }
    return this.props.store.currentUser.stars.indexOf(this.props.lesson.id) >= 0
  }

  render () {
    return (
      <Wrapper fixed={this.state.progressLock}>
        {!this.props.static &&
        <ProgressWrapper
          fixed={this.state.progressLock}
          complete={false}>
          <ProgressName className="progress-name">{this.props.lesson.name}</ProgressName>
          {this.state.progressLock &&
          <Link to="/">
            <ProgressLogo color={colors.disabled} height={20}/>
          </Link>
          }
          <Progress>
            <Fill
              complete={false}
              style={{width: `${(this.props.report.currentIndex / (8)) * 100}%`}}
            />
          </Progress>
        </ProgressWrapper>
        }
        <Preview lesson={this.props.lesson} readOnly={true}/>
        {!this.props.static &&
        <Footer>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Star onClick={this.star}>
              <Icon icon={this.hasStarred ? 'starFill' : 'star'} size="x-small"/>
              <type.note color={colors.grey}>{this.props.lesson.stars}</type.note>
            </Star>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <type.note style={{marginRight: 8}} color={colors.grey}>
                Created by: {this.props.lesson.user.name || 'Unnamed'}
              </type.note>
              <ProPic src={this.props.lesson.user.image}/>
            </div>
          </div>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div>
              <DeleteManager
                message="Are you sure you want to reset and start at the beginning?"
                delete={() => {
                  animateScroll.scrollToTop()
                  setTimeout(() => {
                    this.props.report.currentIndex = 0
                    this.props.report.save()
                  }, 1800)
                }}>
                <type.note color={colors.link} style={{cursor: 'pointer'}}>
                  Reset Progress
                </type.note>
              </DeleteManager>
            </div>
            <div>
              <type.note
                color={colors.link}
                style={{cursor: 'pointer'}}
                onClick={() => animateScroll.scrollToTop()}>
                Scroll to Top
              </type.note>
            </div>
          </div>
        </Footer>
        }
      </Wrapper>
    )
  }
}

LessonViewer.propTypes = {
  lesson: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
  static: PropTypes.bool
}

export default LessonViewer
