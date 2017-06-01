import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

import { colors, type, media } from '../../../utils/style'
import Logo from '../../static/Logo'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-top: 56px;
  justify-content: space-between;
  position: relative;
  height: 40px;
  margin-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
  box-sizing: border-box;
  border-top: 1px solid ${colors.divider};
  
  ${media.handheld`
     flex-direction: column;
     height: 100px;
     margin-bottom: 16px;
  `}
`

const Side = styled.div`
  display: flex;
  align-items: center;
  margin-left: -8px;
  margin-right: -8px;
  
  ${media.handheld`
     flex-direction: column;
  `}
`

const StyledLogo = styled(Logo)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: 8px;
  
  ${media.handheld`
     top: -16px;
  `}
`

const Footer = () =>
  <Wrapper>
    <Side>
      <type.label color={colors.grey} style={{marginLeft: 8, marginRight: 24}}>
        © 2017 TeachOK Inc.
      </type.label>
      <type.label
        onClick={() => window.Intercom('show')}
        color={colors.link}
        style={{marginLeft: 8, marginRight: 8, cursor: 'pointer'}}>
        Contact
      </type.label>
      <Link
        style={{textDecoration: 'none'}}
        to="/lesson/58e83703f6dea796c8f472ce">
        <type.label
          color={colors.link}
          style={{marginLeft: 8, marginRight: 8, cursor: 'pointer'}}>
          Documentation
        </type.label>
      </Link>
    </Side>
    <Link to="/">
      <StyledLogo color={colors.disabled} height={24}/>
    </Link>
    <Side>
      <a
        target="__blank"
        href="https://www.patreon.com/teach"
        style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: 8,
          marginRight: 8,
          textDecoration: 'none',
          color: colors.link
        }}>
        <img width={20} height={20} src="https://www.teachok.com/patreon_logo.svg"/>
        <type.label style={{marginLeft: 12}}>Support TeachOK on Patreon</type.label>
      </a>
      <a
        target="__blank"
        href="https://www.twitter.com/teach_ok"
        style={{marginLeft: 24, height: 16}}>
        <img height={16} src="/twitter.svg"/>
      </a>
      <a
        target="__blank"
        href="https://www.instagram.com/teach.ok"
        style={{marginLeft: 16, height: 16, marginRight: 16}}>
        <img height={16} src="/insta.svg"/>
      </a>
    </Side>
  </Wrapper>

export default Footer
