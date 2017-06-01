import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

import { colors, type, media } from '../../../utils/style'

import Align from '../../layout/Align'

const Spacer = styled(type.heading)`
  font-weight: 400;
  margin-left: 8px;
  margin-right: 8px;
  color: ${colors.disabled};
  line-height: 24px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
`

const HideMobile = styled.div`
  display: flex;
  align-items: center;
  ${media.handheld`
  display: none;
  `}
`

const AccountLessonLinks = ({account, lesson, message}) =>
  <Align>
    <HideMobile>
      <StyledLink to={`/account/${account.id}`}>
        <type.label color={colors.link}>{account.name || 'Unnamed Account'}</type.label>
      </StyledLink>
      <Spacer>/</Spacer>
    </HideMobile>
    <StyledLink to={`/lesson/${lesson.id}`}>
      <type.label color={colors.link} style={{fontWeight: message ? 400 : 500}}>
        {lesson.name || 'Unnamed Lesson'}
      </type.label>
    </StyledLink>
    {message && [
      <Spacer key="spacer">/</Spacer>,
      <StyledLink key="message" to={`/lesson/${lesson.id}/${message.order + 1}`}>
        <type.label color={colors.link}><b>{message.name || 'Unnamed Message'}</b></type.label>
      </StyledLink>
    ]}
  </Align>

AccountLessonLinks.propTypes = {
  account: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  lesson: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
}

export default AccountLessonLinks
