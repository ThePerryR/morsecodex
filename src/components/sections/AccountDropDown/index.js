import React, { Component, PropTypes } from 'react'
import onClickOutside from 'react-onclickoutside'
import styled from 'styled-components'
import { Link } from 'react-router'

import { colors, type } from '../../../utils/style'
import AccountImage from '../../static/AccountImage'
import Icon from '../../static/Icon'
import MenuItem from '../../static/MenuItem'
import Menu from '../../items/Menu'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const Toggle = styled(Icon)`
  margin-left: 8px;
`

const PositionedMenu = styled(Menu)`
  position: absolute;
  top: 40px;
  right: 0;
  z-index: 4;
`

class AccountDropDown extends Component {
  constructor (props) {
    super(props)
    this.state = {open: false}
  }

  handleClickOutside () {
    if (this.state.open) {
      this.setState({open: false})
    }
  }

  toggleOpen = () => this.setState({open: !this.state.open})

  render () {
    const {account, style, className, handleCreateLesson} = this.props
    const {image, name} = account
    return (
      <Wrapper style={style} className={className} onClick={this.toggleOpen}>
        <AccountImage image={image} style={{marginRight: 12}}/>
        <type.label><b>{name || 'Unnamed'}</b></type.label>
        <Toggle size="x-small" icon="down"/>
        {this.state.open &&
        <PositionedMenu>
          <div style={{cursor: 'pointer'}} onClick={handleCreateLesson}>
            <MenuItem>New Lesson</MenuItem>
          </div>
          <Link to={`/lessons`} style={{textDecoration: 'none', color: colors.black}}>
            <MenuItem>Your Lessons</MenuItem>
          </Link>
          <div style={{cursor: 'pointer'}} onClick={() => window.Intercom('show')}>
            <MenuItem>Contact</MenuItem>
          </div>
          <a href="/logout" style={{textDecoration: 'none', color: colors.black}}>
            <MenuItem>Logout</MenuItem>
          </a>
        </PositionedMenu>
        }
      </Wrapper>
    )
  }
}

AccountDropDown.propTypes = {
  account: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string
  }).isRequired
}

export default onClickOutside(AccountDropDown)
