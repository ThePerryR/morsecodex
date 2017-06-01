import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { colors, type } from '../../../utils/style'

const Wrapper = styled.div`
  display: flex;
  margin-left: -8px;
  margin-right: -8px;
`

const Stat = styled(type.note)`
  display: flex;
  padding: 4px;
  box-sizing: border-box;
  align-items: center;
  margin-left: 8px;
  margin-right: 8px;
  font-weight: 600;
  color: ${colors.grey};
  ${props => props.onClick && `
    border: 1px solid ${colors.border};
    border-radius: 2px;
    cursor: pointer;
    padding-left: 8px;
    padding-right: 8px;
  `}
`

const Section = styled.div`
  display: flex;
  align-items: center;
`

const StatsBar = ({stats}) =>
  <Wrapper>
    {stats.map((stat, i) => (
      <Stat key={i} onClick={stat.handleClick ? stat.handleClick : null}>
        <Section style={{marginRight: 4}}>{stat.count}</Section>
        <Section>{stat.label}</Section>
      </Stat>
    ))}
  </Wrapper>

StatsBar.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number.isRequired,
    label: PropTypes.node.isRequired
  })).isRequired
}

export default StatsBar
