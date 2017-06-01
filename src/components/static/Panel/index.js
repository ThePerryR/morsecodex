import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { colors, type } from '../../../utils/style'
import Align from '../../layout/Align'

const Wrapper = styled.div`
  margin-bottom: 24px;
  border-radius: 4px;
  border: 1px solid ${colors.border};
`

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  padding-left: 8px;
  padding-right: 8px;
  box-sizing: border-box;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 1px solid ${colors.border};
  background: ${colors.background};
  color: ${colors.black};
`

const Content = styled.div`  
`

const Panel = (props) =>
  <Wrapper>
    <PanelHeader>
      <type.label><b>{props.title}</b></type.label>
      <Align style={props.extraStyles}>
        {props.extra}
      </Align>
    </PanelHeader>
    <Content>
      {props.children}
    </Content>
  </Wrapper>

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  extra: PropTypes.arrayOf(PropTypes.node),
  extraStyles: PropTypes.object
}
Panel.defaultProps = {
  extra: [],
  extraStyles: {}
}

export default Panel
