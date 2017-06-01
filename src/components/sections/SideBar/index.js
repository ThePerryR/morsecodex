import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

import categories from '../../../constants/categories'
import { colors } from '../../../utils/style'
import Icon from '../../static/Icon'
import Logo from '../../static/Logo'

const Wrapper = styled.div`
  width: 262px;
  padding-top: 24px;
  padding-bottom: 24px;
  padding-left: 28px;
  padding-right: 32px;
  box-sizing: border-box;
  background: ${colors.background};
`

const Nav = styled.div`
  display: flex;
  align-items: center;
  height: 42px;
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
  cursor: pointer;
  border-radius: 5px;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  font-size: 18px;
  font-weight: 600;
  color: ${colors.black};
  box-shadow: none;
  
  &:hover {
    color: black;
  }
  
  ${props => props.selected && `
    color: white;
    background: ${colors.primary};
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    &:hover {
      color: white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.32);
    }
    
  `}
`

const SectionTitle = styled(Nav)`
  margin-top: 20px;
  margin-bottom: 8px;
  cursor: initial;
  text-transform: uppercase;
  color: ${colors.disabled};
  font-size: 16px;
  &:hover {
    color: ${colors.disabled};
  }
`

const SubNav = styled(Nav)`
  font-size: 14px;
  color: ${props => props.primary ? colors.primary : colors.black};
  &:hover {
    color: ${props => props.primary ? colors.primary : colors.black};
  }
`

const StyledLogo = styled(Logo)`
  transform: scale(1);
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 44px;
  transition: transform 150ms ease-in;
  &:hover {
    transform: scale(1.18);
  }
`

class SideBar extends React.Component {
  render () {
    const {pathname, user, search} = this.props
    return (
      <Wrapper>
        <Link to="/">
          <StyledLogo
            style={{display: 'block'}}
            height={32}
            color="#343534"
          />
        </Link>
        <Link to="/" style={{textDecoration: 'none'}}>
          <Nav selected={pathname === '/'}>Dashboard</Nav>
        </Link>
        <Link to="/search" style={{textDecoration: 'none'}}>
          <Nav selected={pathname === '/search'}>Browse</Nav>
        </Link>
        {user &&
        <Link to="/teach" style={{textDecoration: 'none'}}>
          <Nav selected={pathname === '/teach'}>Teach</Nav>
        </Link>
        }
        <SectionTitle>Categories</SectionTitle>
        {categories.map(category =>
          <Link
            to={`/search?category=${category.value}`}
            key={category.value}
            style={{textDecoration: 'none'}}>
            <SubNav primary={pathname === '/search' && search === `?category=${category.value}`}>
              <Icon
                icon={category.icon}
                style={{marginRight: 8}}
                color={pathname === '/search' && search === `?category=${category.value}` ? 'primary' : 'black'}
              />
              {category.name}
            </SubNav>
          </Link>
        )}
      </Wrapper>
    )
  }
}

SideBar.propTypes = {
  pathname: PropTypes.string.isRequired
}

export default SideBar
