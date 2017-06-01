import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import styled from 'styled-components'

import { colors } from '../../../utils/style'
import Input from '../../dom/Input'

const StyledInput = styled(Input)`
  width: auto;
  min-width: 268px;
  border-radius: 16px;
  fontWeight: 500;
  color: ${colors.grey};
  &:focus {
    border-width: 2px;
    color: ${colors.primary};
  }
  &::-webkit-input-placeholder {
    color: ${colors.disabled};
  }
  &::-moz-placeholder {
    color: ${colors.disabled};
  }
  &:-ms-input-placeholder {
    color: ${colors.disabled};
  }
  &:-moz-placeholder {
    color: ${colors.disabled};
  }
`

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: decodeURIComponent(props.defaultQuery)
    }
  }

  startTimer = () => {
    clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(this.search, 320)
  }
  handleChange = e => {
    this.setState({query: e.target.value}, this.startTimer)
  }
  handleKeyPress = e => e.key === 'Enter' && this.search()
  search = () => {
    clearTimeout(this.searchTimeout)
    if (this.state.query) {
      browserHistory.push(`/search/${encodeURIComponent(this.state.query)}`)
    } else {
      browserHistory.push('/')
    }
  }

  render () {
    return (
      <StyledInput
        style={{
          ...(this.props.style || {})
        }}
        className={this.props.className}
        value={this.state.query}
        placeholder="What would you like to learn today?"
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
      />
    )
  }
}

Search.propTypes = {
  defaultQuery: PropTypes.string
}
Search.defaultProps = {
  defaultQuery: ''
}

export default Search
