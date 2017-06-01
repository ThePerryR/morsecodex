import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router'
import styled from 'styled-components'

import { colors, type } from '../../../utils/style'
import CombinationLogo from '../../static/CombinationLogo'
import AccountDropDown from '../AccountDropDown'

const Wrapper = styled.div`
  height: 64px;
  width: 100%;
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  border-bottom: 1px solid ${colors.divider};
`

const Login = styled(Link)`
  color: ${colors.disabled};
  white-space: nowrap;
  text-decoration: none;
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const Label = styled(type.label)`
  font-weight: 300;
  margin-right: 16px;
  color: ${colors.primary};
  cursor: pointer;
`

const Header = ({user, handleCreateLesson}) => {
  return (
    <Wrapper>
      <CombinationLogo />
      {user
        ? (
          <Row>
            <Label
              style={{marginRight: 24}}
              onClick={handleCreateLesson}>
              Create a lesson
            </Label>
            <AccountDropDown account={user} handleCreateLesson={handleCreateLesson}/>
          </Row>
        )
        : (
          <Login to="/login">
            <type.label><b>Login / Join</b></type.label>
          </Login>
        )}
    </Wrapper>
  )
}

Header.propTypes = {
  user: PropTypes.shape({})
}

export default observer(Header)
